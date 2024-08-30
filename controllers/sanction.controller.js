'use strict';

const { Sanction, Match, Player, SanctionType } = require('../models');
const clog = require('./log.controller');

module.exports = {
    async getSanctionsByMatch(req, res) {
        const matchId = req.params.match_id;

        try {
            if (!matchId) {
                return res.status(400).json({ message: 'El ID del partido es requerido' });
            }

            const matchExists = await Match.findByPk(matchId);

            if (!matchExists) {
                return res.status(404).json({ message: 'El partido no existe' });
            }

            const sanctions = await Sanction.findAll({
                where: { match_id: matchId },
                include: [
                    {
                        model: Player,
                        as: 'player',
                        attributes: ['id', 'name', 'player_number'],
                    },
                    {
                        model: SanctionType,
                        as: 'sanctionType',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Match,
                        as: 'match',
                        attributes: ['id', 'home_team_id', 'away_team_id'],
                    }
                ],
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            if (sanctions.length === 0) {
                return res.status(404).json({ message: 'No se encontraron sanciones para el partido proporcionado' });
            }

            return res.status(200).json(sanctions);
        } catch (error) {
            clog.addLocal(
                'sanction.controller',
                'getSanctionsByMatch',
                'Error al consultar las sanciones: ' + error,
                'Error al consultar las sanciones'
            );
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
};
