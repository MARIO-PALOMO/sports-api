'use strict';

const { Sanction, Match, Player, SanctionType, Team, sequelize } = require('../models');
const logController = require('./log.controller');

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
            console.error('Error al consumir getSanctionsByMatch: ', error);
            logController.addLocal('sanction.controller', 'getSanctionsByMatch', 'Error al consultar sanciones: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener las sanciones, ' + error.message });
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
            console.error('Error al consumir getSanctionsByType: ', error);
            logController.addLocal('sanction.controller', 'getSanctionsByType', 'Error al consultar sanciones: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener las sanciones, ' + error.message });
        }
    },

    async getTopFiveSanctionsByType(req, res) {
        const { sanction_type_id } = req.params;
        try {
            // Verifica que el ID del tipo de sanción sea válido
            if (!sanction_type_id) {
                return res.status(200).json({ data: null, message: 'El ID del tipo de sanción es requerido.' });
            }

            // Verifica que el tipo de sanción exista
            const sanctionType = await SanctionType.findByPk(sanction_type_id);
            if (!sanctionType) {
                return res.status(200).json({ data: null, message: 'Tipo de sanción no encontrado.' });
            }

            // Obtener las sanciones por jugador y contar cuántas sanciones tiene cada uno
            const sanctions = await Sanction.findAll({
                attributes: [
                    'player_id',
                    [sequelize.fn('COUNT', sequelize.col('player_id')), 'sanctions_count'], // Contar sanciones por jugador
                    [sequelize.fn('ARRAY_AGG', sequelize.col('match_id')), 'match_ids'], // Obtener los match_id en un array
                ],
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
                            },
                        ],
                    },
                ],
                group: ['player_id', 'player.id', 'player.team_id', 'player.team.id'], // Agrupar por jugador y equipo
                order: [[sequelize.literal('sanctions_count'), 'DESC']], // Ordenar por cantidad de sanciones
                limit: 5, // Limitar a los 5 jugadores con más sanciones
            });

            // Verificar si se encontraron sanciones
            if (sanctions.length === 0) {
                return res.status(200).json({ data: null, message: 'No se encontraron sanciones.' });
            }

            // Formatear la respuesta para incluir solo la información solicitada
            const response = sanctions.map((sanction) => ({
                player_id: sanction.player.id,
                player_name: sanction.player.name,
                player_number: sanction.player.player_number,
                team_id: sanction.player.team.id,
                team_name: sanction.player.team.name,
                team_logo: sanction.player.team.logo,
                sanctions_count: sanction.getDataValue('sanctions_count'),
                match_ids: sanction.getDataValue('match_ids'), // Ya no se necesita split
            }));


            // Responder con los jugadores con más sanciones
            return res.status(200).json({ data: response, message: 'Sanciones obtenidas con éxito.' });

        } catch (error) {
            console.error('Error al obtener sanciones por tipo:', error);
            logController.addLocal('sanction.controller', 'getTopFiveSanctionsByType', 'Error al consultar sanciones: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener las sanciones, ' + error.message });
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
            console.error('Error al consumir getSanctionsByTypeAndTeam: ', error);
            logController.addLocal('sanction.controller', 'getSanctionsByTypeAndTeam', 'Error al consultar sanciones: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener las sanciones, ' + error.message });
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
            console.error('Error al consumir getSanctionsByTypeAndMatch: ', error);
            logController.addLocal('sanction.controller', 'getSanctionsByTypeAndMatch', 'Error al consultar sanciones: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener las sanciones, ' + error.message });
        }
    },
    
    async addSanctionsByMatch(req, res) {

        const { match_id, sanctions } = req.body;
        
        if (!match_id || !Array.isArray(sanctions) || sanctions.length === 0) {
            return res.status(200).json({ data: null, message: 'El match_id es obligatorio y debe haber al menos una sanción en el listado.' });
        }

        try {
            // Verificar que el partido existe
            const match = await Match.findByPk(match_id);
            if (!match) {
                return res.status(200).json({ data: null, message: 'El match_id enviado: ' + match_id + ' no se ha encontrado.' });
            }

            // Verificar que todos los players y sanction_types existen en paralelo
            const players = await Promise.all(sanctions.map(sanction => Player.findByPk(sanction.player_id)));
            const sanctionTypes = await Promise.all(sanctions.map(sanction => SanctionType.findByPk(sanction.sanction_type_id)));

            // Validar la existencia de jugadores y tipos de sanción
            for (let i = 0; i < sanctions.length; i++) {
                if (!players[i]) {
                    return res.status(200).json({ data: null, message: `Jugador con ID ${sanctions[i].player_id} no encontrado.` });
                }
                if (!sanctionTypes[i]) {
                    return res.status(200).json({ data: null, message: `Tipo de sanción con ID ${sanctions[i].sanction_type_id} no encontrado.` });
                }
            }

            const transaction = await Sanction.sequelize.transaction();

            try {
                // Crear todas las sanciones en una transacción
                await Promise.all(
                    sanctions.map(sanction =>
                        Sanction.create(
                            {
                                player_id: sanction.player_id,
                                sanction_type_id: sanction.sanction_type_id,
                                match_id: match_id,
                                active: true, // Se puede ajustar según las necesidades
                            },
                            { transaction }
                        )
                    )
                );
                
                await transaction.commit();
                return res.status(200).json({ data: match_id, message: 'Sanciones creadas exitosamente.' });

            } catch (error) {
                await transaction.rollback();
                throw error; // Lanzar el error para manejarlo en el siguiente bloque catch
            }
        } catch (error) {
            console.error('Error al consumir addSanctionsByMatch: ', error);
            logController.addLocal('sanction.controller', 'addSanctionsByMatch', 'Error al crear sanciones del partido: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al crear las sanciones del partido, ' + error.message });
        }
    },

};
