'use strict';

const { Sanction, Match, Player, SanctionType, Team } = require('../models');
const clog = require('./log.controller');

module.exports = {

    async getSanctionsByMatch(req, res) {
        const matchId = req.params.match_id;

        try {
            if (!matchId) {
                return res.status(200).json({ message: 'El ID del partido es requerido' });
            }

            const matchExists = await Match.findByPk(matchId);

            if (!matchExists) {
                return res.status(200).json({ message: 'El partido no existe' });
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
                return res.status(200).json({ message: 'No se encontraron sanciones para el partido proporcionado' });
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

    async getSanctionsByType(req, res) {
        const { sanction_type_id } = req.params;

        try {
            // Verifica que el ID del tipo de sanción sea válido
            if (!sanction_type_id) {
                return res.status(200).json({
                    data: null,
                    message: 'El ID del tipo de sanción es requerido.'
                });
            }

            // Verifica que el tipo de sanción exista
            const sanctionType = await SanctionType.findByPk(sanction_type_id);
            if (!sanctionType) {
                return res.status(200).json({
                    data: null,
                    message: 'Tipo de sanción no encontrado.'
                });
            }

            // Obtiene las sanciones que coincidan con el tipo de sanción solicitado
            const sanctions = await Sanction.findAll({
                where: {
                    sanction_type_id,
                },
                include: [
                    {
                        model: Player,
                        as: 'player',
                        attributes: ['id', 'name', 'player_number', 'team_id'],
                        include: [
                            {
                                model: Team,
                                as: 'team',
                                attributes: ['id', 'name', 'logo'],
                            }
                        ]
                    }
                ]
            });

            // Agrupa y cuenta las sanciones por jugador
            const sanctionsByPlayer = sanctions.reduce((acc, sanction) => {
                const playerId = sanction.player.id;
                const teamId = sanction.player.team.id;
                const teamName = sanction.player.team.name;
                const teamLogo = sanction.player.team.logo;
                const matchId = sanction.match_id;
                const playerName = sanction.player.name;
                const playerNumber = sanction.player.player_number;

                if (!acc[playerId]) {
                    acc[playerId] = {
                        player_id: playerId,
                        player_name: playerName,
                        player_number: playerNumber,
                        team_id: teamId,
                        team_name: teamName,
                        team_logo: teamLogo,
                        sanctions_count: 0,
                        match_ids: []
                    };
                }

                acc[playerId].sanctions_count += 1;
                acc[playerId].match_ids.push(matchId);

                return acc;
            }, {});

            // Convierte el objeto a un array
            const result = Object.values(sanctionsByPlayer);

            // Ordena el resultado por sanctions_count de manera descendente
            result.sort((a, b) => b.sanctions_count - a.sanctions_count);

            return res.status(200).json({
                data: result,
                message: 'Sanciones obtenidas con éxito.'
            });

        } catch (error) {
            console.error('Error al obtener sanciones por tipo:', error);
            return res.status(500).json({
                data: null,
                message: 'Ocurrió un error al obtener las sanciones. Por favor, inténtelo nuevamente.'
            });
        }
    },

    async getSanctionsByTypeAndTeam(req, res) {
        
        const { sanction_type_id, team_id } = req.params;

        try {
            // Verifica que el ID del tipo de sanción sea válido
            if (!sanction_type_id) {
                return res.status(200).json({
                    data: null,
                    message: 'El ID del tipo de sanción es requerido.'
                });
            }

            // Verifica que el ID del equipo sea válido
            if (!team_id) {
                return res.status(200).json({
                    data: null,
                    message: 'El ID del equipo es requerido.'
                });
            }

            // Verifica que el tipo de sanción exista
            const sanctionType = await SanctionType.findByPk(sanction_type_id);
            if (!sanctionType) {
                return res.status(200).json({
                    data: null,
                    message: 'Tipo de sanción no encontrado.'
                });
            }

            // Verifica que el equipo exista
            const team = await Team.findByPk(team_id);
            if (!team) {
                return res.status(200).json({
                    data: null,
                    message: 'Equipo no encontrado.'
                });
            }

            // Obtiene las sanciones que coincidan con el tipo de sanción y el ID del equipo solicitado
            const sanctions = await Sanction.findAll({
                where: {
                    sanction_type_id,
                },
                include: [
                    {
                        model: Player,
                        as: 'player',
                        attributes: ['id', 'name', 'player_number', 'team_id'],
                        where: {
                            team_id,
                        },
                        include: [
                            {
                                model: Team,
                                as: 'team',
                                attributes: ['id', 'name'],
                            }
                        ]
                    }
                ]
            });

            // Agrupa y cuenta las sanciones por jugador
            const sanctionsByPlayer = sanctions.reduce((acc, sanction) => {
                const playerId = sanction.player.id;
                const teamId = sanction.player.team.id;
                const matchId = sanction.match_id;
                const playerName = sanction.player.name;
                const playerNumber = sanction.player.player_number;
                const teamName = sanction.player.team.name;

                if (!acc[playerId]) {
                    acc[playerId] = {
                        player_id: playerId,
                        player_name: playerName,
                        player_number: playerNumber,
                        team_id: teamId,
                        team_name: teamName,
                        sanctions_count: 0,
                        match_ids: []
                    };
                }

                acc[playerId].sanctions_count += 1;
                acc[playerId].match_ids.push(matchId);

                return acc;
            }, {});

            // Convierte el objeto a un array
            const result = Object.values(sanctionsByPlayer);

            // Ordena el resultado por sanctions_count de manera descendente
            result.sort((a, b) => b.sanctions_count - a.sanctions_count);

            return res.status(200).json({
                data: result,
                message: 'Sanciones obtenidas con éxito.'
            });

        } catch (error) {
            console.error('Error al obtener sanciones por tipo y equipo:', error);
            return res.status(500).json({
                data: null,
                message: 'Ocurrió un error al obtener las sanciones. Por favor, inténtelo nuevamente.'
            });
        }
    },

    async getSanctionsByTypeAndMatch(req, res) {
        const { sanction_type_id, match_id } = req.params;
    
        try {
            // Verifica que el ID del tipo de sanción sea válido
            if (!sanction_type_id) {
                return res.status(200).json({
                    data: null,
                    message: 'El ID del tipo de sanción es requerido.'
                });
            }
    
            // Verifica que el ID del partido sea válido
            if (!match_id) {
                return res.status(200).json({
                    data: null,
                    message: 'El ID del partido es requerido.'
                });
            }
    
            // Verifica que el tipo de sanción exista
            const sanctionType = await SanctionType.findByPk(sanction_type_id);
            if (!sanctionType) {
                return res.status(200).json({
                    data: null,
                    message: 'Tipo de sanción no encontrado.'
                });
            }
    
            // Verifica que el partido exista
            const match = await Match.findByPk(match_id);
            if (!match) {
                return res.status(200).json({
                    data: null,
                    message: 'Partido no encontrado.'
                });
            }
    
            // Obtiene las sanciones que coincidan con el tipo de sanción y el ID del partido solicitado
            const sanctions = await Sanction.findAll({
                where: {
                    sanction_type_id,
                    match_id, // Filtra por el ID del partido
                },
                include: [
                    {
                        model: Player,
                        as: 'player',
                        attributes: ['id', 'name', 'player_number', 'team_id'],
                        include: [
                            {
                                model: Team,
                                as: 'team',
                                attributes: ['id', 'name', 'logo'],
                            }
                        ]
                    }
                ]
            });
    
            // Agrupa y cuenta las sanciones por jugador
            const sanctionsByPlayer = sanctions.reduce((acc, sanction) => {
                const playerId = sanction.player.id;
                const teamId = sanction.player.team.id;
                const teamName = sanction.player.team.name;
                const teamLogo = sanction.player.team.logo;
                const matchId = sanction.match_id;
                const playerName = sanction.player.name;
                const playerNumber = sanction.player.player_number;
                
                if (!acc[playerId]) {
                    acc[playerId] = {
                        player_id: playerId,
                        player_name: playerName,
                        player_number: playerNumber,
                        team_id: teamId,
                        team_name: teamName,
                        team_logo: teamLogo,
                        sanctions_count: 0,
                        match_ids: []
                    };
                }
    
                acc[playerId].sanctions_count += 1;
                acc[playerId].match_ids.push(matchId);
    
                return acc;
            }, {});
    
            // Convierte el objeto a un array
            const result = Object.values(sanctionsByPlayer);
    
            // Ordena el resultado por sanctions_count de manera descendente
            result.sort((a, b) => b.sanctions_count - a.sanctions_count);
    
            return res.status(200).json({
                data: result,
                message: 'Sanciones obtenidas con éxito.'
            });
    
        } catch (error) {
            console.error('Error al obtener sanciones por tipo y partido:', error);
            return res.status(500).json({
                data: null,
                message: 'Ocurrió un error al obtener las sanciones. Por favor, inténtelo nuevamente.'
            });
        }
    },    

};
