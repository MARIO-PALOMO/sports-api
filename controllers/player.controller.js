const fs = require('fs');
const path = require('path');
const { Player, Team } = require('../models');
const logController = require('./log.controller');
const { Sequelize } = require('sequelize');

// Ruta de la foto predeterminada
const defaultPhotoPath = path.resolve(__dirname, '..', 'images', 'players', 'player_default.png');

// Función para cargar la foto predeterminada en base64
const loadDefaultPhoto = () => {
    try {
        return fs.readFileSync(defaultPhotoPath, { encoding: 'base64' });
    } catch (error) {
        console.error(`Error al cargar la foto predeterminada: ${error}`);
        return null;
    }
};

module.exports = {

    // Consulta de todos los jugadores
    async getAllPlayers(req, res) {
        try {
            const players = await Player.findAll();
            return res.status(200).json({ message: 'Lista de jugadores encontrados', data: players });
        } catch (error) {
            console.error('Error al consumir getAllPlayers: ', error);
            logController.addLocal('player.controller', 'getAllPlayers', 'Error al obtener el listado de jugadores: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener el listado de jugadores, ' + error.message });
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
            console.error('Error al consumir getPlayerById: ', error);
            logController.addLocal('player.controller', 'getPlayerById', 'Error al obtener un jugadores por id: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener un jugador por id, ' + error.message });
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
            console.error('Error al consumir getAllPlayersByTeamId: ', error);
            logController.addLocal('player.controller', 'getAllPlayersByTeamId', 'Error al obtener el listado de jugadores por team_id: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener el listado de jugadores por team_id, ' + error.message });
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
            console.error('Error al consumir addPlayer: ', error);
            logController.addLocal('player.controller', 'addPlayer', 'Error al agregar jugador: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al agregar jugador, ' + error.message });
        }
    },

    // Creación de varios jugadores a la vez
    async addMultiplePlayers(req, res) {
        const { body: playersData } = req;
        try {
            // Cargar la foto predeterminada una sola vez
            const defaultPhoto = loadDefaultPhoto();
            if (!defaultPhoto) {
                return res.status(500).json({ data: null, message: 'Error al cargar la foto predeterminada.' });
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
                    return res.status(200).json({ data: null, mesaage: 'Equipo no encontrado ' + playerData.team_name });
                }

                try {
                    const player = await Player.create({
                        ...playerData,
                        team_id: teamId,
                        photo: defaultPhoto,
                    });

                    players.push(player);
                } catch (playerError) {
                    return res.status(500).json({ data: null, message: 'Error al crear jugador, ' + playerError.message });
                }
            }

            if (!players.length) {
                return res.status(200).json({ data: null, error: 'No se pudo crear ningún jugador.' });
            }

            return res.status(200).json({ message: 'Jugadores creados exitosamente', data: players });
        } catch (error) {
            console.error('Error al consumir addMultiplePlayers: ', error);
            logController.addLocal('player.controller', 'addMultiplePlayers', 'Error al agregar múltiples jugadores: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al agregar múltiples jugadores, ' + error.message });
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
            console.error('Error al consumir updatePlayer: ', error);
            logController.addLocal('player.controller', 'updatePlayer', 'Error al actualizar los datos de un jugador: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al actualizar los datos de un jugador, ' + error.message });
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
            console.error('Error al consumir updatePlayerPhoto: ', error);
            logController.addLocal('player.controller', 'updatePlayerPhoto', 'Error al actualizar la fotografía de un jugador: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al actualizar la fotografía de un jugador, ' + error.message });
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
            console.error('Error al consumir deletePlayer: ', error);
            logController.addLocal('player.controller', 'deletePlayer', 'Error al eliminar un jugador: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al eliminar un jugador, ' + error.message });
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
            console.error('Error al consumir deleteMultiplePlayers: ', error);
            logController.addLocal('player.controller', 'deleteMultiplePlayers', 'Error al eliminar múltiples jugadores: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al eliminar múltiples jugadores, ' + error.message });
        }
    },
};
