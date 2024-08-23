const fs = require('fs');
const path = require('path');
const { Player, Team } = require('../models');
const clog = require('./log.controller');
const { Sequelize } = require('sequelize');

// Ruta de la foto predeterminada
const defaultPhotoPath = path.resolve(__dirname, '..', 'images', 'players', 'player_default.png');

// Función para cargar la foto predeterminada en base64
const loadDefaultPhoto = () => fs.readFileSync(defaultPhotoPath, { encoding: 'base64' });

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
                return res.status(404).json({ data: null, message: 'Jugador no encontrado' });
            }
            return res.status(200).json({ message: 'Juagador encontrado', data: player });
        } catch (error) {
            clog.addLocal('player.controller', 'getPlayerById', `Error al consultar getPlayerById: ${error}`, JSON.stringify(req));
            return res.status(500).json({ data: null, error: `Error al consultar jugador: ${error}` });
        }
    },

    // Consulta de todos los jugadores con la información del equipo
    async getAllPlayersWithTeams(req, res) {
        try {
            const players = await Player.findAll({
                include: {
                    model: Team,
                    as: 'team',
                },
            });
            return res.status(200).json({ message: 'Jugadores encontrados', data: players });
        } catch (error) {
            clog.addLocal('player.controller', 'getAllPlayersWithTeams', `Error al consultar getAllPlayersWithTeams: ${error}`, JSON.stringify(req));
            return res.status(500).json({ data: null, error: `Error al consultar jugadores con equipos: ${error}` });
        }
    },

    // Creación de un jugador con una foto predeterminada
    async addPlayer(req, res) {
        const { name, document_number, birthdate, player_number, team_id } = req.body;
        try {
            const player = await Player.create({
                name,
                document_number,
                birthdate,
                player_number,
                team_id,
                photo: loadDefaultPhoto(),
            });
            return res.status(200).json({ message: 'Jugador creado exitosamente', data: player });
        } catch (error) {
            clog.addLocal('player.controller', 'addPlayer', `Error al consumir addPlayer: ${error}`, JSON.stringify(req));
            return res.status(400).json({ data: null, error: `Error al crear jugador: ${error}` });
        }
    },

    // Creación de varios jugadores a la vez
    async addMultiplePlayers(req, res) {
        const playersData = req.body;
        try {
            const players = await Promise.all(playersData.map(playerData => Player.create({
                ...playerData,
                photo: loadDefaultPhoto(),
            })));
            return res.status(200).json({ message: 'Jugadores creados exitosamente', data: players });
        } catch (error) {
            clog.addLocal('player.controller', 'addMultiplePlayers', `Error al consumir addMultiplePlayers: ${error}`, JSON.stringify(req));
            return res.status(400).json({ data: null, error: `Error al crear jugadores: ${error}` });
        }
    },

    // Actualización de datos
    async updatePlayer(req, res) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const player = await Player.findByPk(id);
            if (!player) {
                return res.status(404).json({ data: null, error: 'Jugador no encontrado' });
            }
            await player.update(updates);
            return res.status(200).json({ message: 'Jugador actualizado exitosamente', data: player });
        } catch (error) {
            clog.addLocal('player.controller', 'updatePlayer', `Error al consumir updatePlayer: ${error}`, JSON.stringify(req));
            return res.status(400).json({ data: null, error: `Error al actualizar jugador: ${error}` });
        }
    },

    // Actualización de foto
    async updatePlayerPhoto(req, res) {
        const { id } = req.params;
        const { photo } = req.body;
        try {
            const player = await Player.findByPk(id);
            if (!player) {
                return res.status(404).json({ data: null, error: 'Jugador no encontrado' });
            }
            player.photo = photo;
            await player.save();
            return res.status(200).json({ message: 'Fotografía actualizada exitosamente', data: player });
        } catch (error) {
            clog.addLocal('player.controller', 'updatePlayerPhoto', `Error al consumir updatePlayerPhoto: ${error}`, JSON.stringify(req));
            return res.status(400).json({ data: null, error: `Error al actualizar foto del jugador: ${error}` });
        }
    },

    // Eliminación individual de un jugador
    async deletePlayer(req, res) {
        const { id } = req.params;
        try {
            const player = await Player.findByPk(id);
            if (!player) {
                return res.status(404).json({ data: null, error: 'Jugador no encontrado' });
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
