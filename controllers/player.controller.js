const fs = require('fs');
const path = require('path');
const { Player, Team } = require('../models');
const clog = require('./log.controller');
const { Sequelize } = require('sequelize');

// Ruta de la foto predeterminada
const defaultPhotoPath = path.resolve(__dirname, '..', 'images', 'players', 'player_default.png');

// Función para cargar la foto predeterminada en base64
const loadDefaultPhoto = () => {
    try {
        return fs.readFileSync(defaultPhotoPath, { encoding: 'base64' });
    } catch (error) {
        console.error(`Error al cargar la foto predeterminada: ${error}`);
        // Devolver un valor por defecto en caso de error, como una cadena vacía o un placeholder base64
        return null; // o podrías devolver una imagen en base64 por defecto
    }
};

module.exports = {

    // Consulta de todos los jugadores
    async getAllPlayers(req, res) {
        try {
            const players = await Player.findAll();
            return res.status(200).json({ message: 'Lista de jugadores encontrados', data: players });
        } catch (error) {
            clog.addLocal('player.controller', 'getAllPlayers', `Error al consultar getAllPlayers: ${error}`, JSON.stringify(req));
            return res.status(500).json({ data: null, error: `Error al consultar jugadores: ${error}` });
        }
    },

    // Consulta de jugador por ID
    async getPlayerById(req, res) {
        const { id } = req.params;
        try {
            const player = await Player.findByPk(id);
            if (!player) {
                return res.status(200).json({ data: null, message: 'Jugador no encontrado' });
            }
            return res.status(200).json({ message: 'Juagador encontrado', data: player });
        } catch (error) {
            clog.addLocal('player.controller', 'getPlayerById', `Error al consultar getPlayerById: ${error}`, JSON.stringify(req));
            return res.status(500).json({ data: null, error: `Error al consultar jugador: ${error}` });
        }
    },

    // Consulta de todos los jugadores de un equipo específico con la información del equipo
    async getAllPlayersByTeamId(req, res) {
        try {
            const { teamId } = req.params; // Obtener el ID del equipo desde los parámetros de la solicitud

            const players = await Player.findAll({
                where: { team_id: teamId }, // Filtrar por el ID del equipo
                include: {
                    model: Team,
                    as: 'team',
                },
                order: [[Sequelize.literal('CAST(player_number AS INTEGER)'), 'ASC']], // Ordenar por player_number numéricamente
            });

            if (!players.length) {
                return res.status(200).json({ message: 'No se encontraron jugadores para este equipo', data: null });
            }

            return res.status(200).json({ message: 'Jugadores encontrados', data: players });
        } catch (error) {
            clog.addLocal('player.controller', 'getAllPlayersByTeamId', `Error al consultar getAllPlayersByTeamId: ${error}`, JSON.stringify(req));
            return res.status(500).json({ data: null, error: `Error al consultar jugadores por equipo: ${error}` });
        }
    },

    // Creación de un jugador con una foto predeterminada
    async addPlayer(req, res) {
        const { name, document_number, birthdate, player_number, team_name } = req.body;
        try {
            // Buscar el ID del equipo por el nombre
            const team = await Team.findOne({ where: { name: team_name } });
            if (!team) {
                return res.status(200).json({ data: null, error: 'Equipo no encontrado.' });
            }

            const defaultPhoto = loadDefaultPhoto();
            if (!defaultPhoto) {
                return res.status(500).json({ data: null, error: 'Error al cargar la foto predeterminada.' });
            }

            const player = await Player.create({
                name,
                document_number,
                birthdate,
                player_number,
                team_id: team.id,  // Usar el ID del equipo encontrado
                photo: defaultPhoto,
            });

            return res.status(200).json({ message: 'Jugador creado exitosamente', data: player });
        } catch (error) {
            // Loguear solo partes relevantes del req para evitar el error de referencia circular
            const logData = {
                method: req.method,
                body: req.body,
                url: req.originalUrl,
            };
            clog.addLocal('player.controller', 'addPlayer', `Error al consumir addPlayer: ${error}`, JSON.stringify(logData));
            return res.status(200).json({ data: null, error: `Error al crear jugador: ${error}` });
        }
    },

    // Creación de varios jugadores a la vez
    async addMultiplePlayers(req, res) {
        const { body: playersData } = req;

        try {
            // Cargar la foto predeterminada una sola vez
            const defaultPhoto = loadDefaultPhoto();
            if (!defaultPhoto) {
                const errorMsg = 'Error al cargar la foto predeterminada.';
                clog.addLocal('player.controller', 'addMultiplePlayers', errorMsg);
                return res.status(500).json({ data: null, error: errorMsg });
            }

            // Obtener los IDs de los equipos en una sola consulta
            const teamNames = playersData.map(player => player.team_name);
            const teams = await Team.findAll({ where: { name: teamNames } });
            const teamsMap = teams.reduce((acc, team) => {
                acc[team.name] = team.id;
                return acc;
            }, {});

            const players = [];

            for (const playerData of playersData) {
                const teamId = teamsMap[playerData.team_name];
                if (!teamId) {
                    const errorMsg = `Equipo no encontrado: ${playerData.team_name}`;
                    clog.addLocal('player.controller', 'addMultiplePlayers', errorMsg, JSON.stringify(playerData));
                    return res.status(200).json({ data: null, error: errorMsg });
                }

                try {
                    const player = await Player.create({
                        ...playerData,
                        team_id: teamId,
                        photo: defaultPhoto,
                    });

                    players.push(player);
                } catch (playerError) {
                    const errorMsg = `Error al crear jugador: ${playerError.message}`;
                    clog.addLocal('player.controller', 'addMultiplePlayers', errorMsg, JSON.stringify(playerData));
                    return res.status(500).json({ data: null, error: errorMsg });
                }
            }

            if (!players.length) {
                const errorMsg = 'No se pudo crear ningún jugador.';
                clog.addLocal('player.controller', 'addMultiplePlayers', errorMsg);
                return res.status(200).json({ data: null, error: errorMsg });
            }

            return res.status(200).json({ message: 'Jugadores creados exitosamente', data: players });
        } catch (error) {
            const logData = {
                method: req.method,
                body: playersData,
                url: req.originalUrl,
            };
            clog.addLocal('player.controller', 'addMultiplePlayers', `Error al consumir addMultiplePlayers: ${error.message}`, JSON.stringify(logData));
            return res.status(500).json({ data: null, error: `Error al crear jugadores: ${error.message}` });
        }
    },

    // Actualización de datos
    async updatePlayer(req, res) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const player = await Player.findByPk(id);
            if (!player) {
                return res.status(200).json({ data: null, error: 'Jugador no encontrado' });
            }
            await player.update(updates);
            return res.status(200).json({ message: 'Jugador actualizado exitosamente', data: player });
        } catch (error) {
            clog.addLocal('player.controller', 'updatePlayer', `Error al consumir updatePlayer: ${error}`, JSON.stringify(req));
            return res.status(200).json({ data: null, error: `Error al actualizar jugador: ${error}` });
        }
    },

    // Actualización de foto
    async updatePlayerPhoto(req, res) {
        const { id } = req.params;
        const { photo } = req.body;
        try {
            const player = await Player.findByPk(id);
            if (!player) {
                return res.status(200).json({ data: null, error: 'Jugador no encontrado' });
            }
            player.photo = photo;
            await player.save();
            return res.status(200).json({ message: 'Fotografía actualizada exitosamente', data: player });
        } catch (error) {
            clog.addLocal('player.controller', 'updatePlayerPhoto', `Error al consumir updatePlayerPhoto: ${error}`, JSON.stringify(req));
            return res.status(200).json({ data: null, error: `Error al actualizar foto del jugador: ${error}` });
        }
    },

    // Eliminación individual de un jugador
    async deletePlayer(req, res) {
        const { id } = req.params;
        try {
            const player = await Player.findByPk(id);
            if (!player) {
                return res.status(200).json({ data: null, error: 'Jugador no encontrado' });
            }
            await player.destroy();
            return res.status(200).json({ message: 'Jugador eliminado exitosamente', data: null });
        } catch (error) {
            clog.addLocal('player.controller', 'deletePlayer', `Error al consumir deletePlayer: ${error}`, JSON.stringify(req));
            return res.status(500).json({ data: null, error: `Error al eliminar jugador: ${error}` });
        }
    },

    // Eliminación múltiple de jugadores
    async deleteMultiplePlayers(req, res) {
        const { ids } = req.body; // Suponiendo que envías un array de IDs
        try {
            await Player.destroy({
                where: {
                    id: {
                        [Sequelize.in]: ids,
                    },
                },
            });
            return res.status(200).json({ message: 'Jugadores eliminados exitosamente', data: null });
        } catch (error) {
            clog.addLocal('player.controller', 'deleteMultiplePlayers', `Error al consumir deleteMultiplePlayers: ${error}`, JSON.stringify(req));
            return res.status(500).json({ error: `Error al eliminar jugadores: ${error}` });
        }
    },
};
