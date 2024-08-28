const { Match, Competition, Round, Team, State, Schedule, Result, Field, sequelize } = require('../models');
const clog = require("./log.controller");

module.exports = {
    // Obtener el listado de todos los partidos
    async getAllMatches(req, res) {
        try {
            const matches = await Match.findAll({
                include: [
                    {
                        model: Competition,
                        as: 'competition',
                        attributes: ['name'], // Solo traer el campo 'name'
                    },
                    {
                        model: Round,
                        as: 'round',
                        attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir createdAt y updatedAt
                    },
                    {
                        model: Team,
                        as: 'homeTeam',
                        attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir createdAt y updatedAt
                    },
                    {
                        model: Team,
                        as: 'awayTeam',
                        attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir createdAt y updatedAt
                    },
                    {
                        model: Schedule,
                        as: 'schedules',
                        attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir createdAt y updatedAt
                        include: [
                            {
                                model: Field,
                                as: 'field',
                                attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir createdAt y updatedAt
                            },
                            {
                                model: State,
                                as: 'state',
                                attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir createdAt y updatedAt
                            },
                        ],
                    },
                    {
                        model: Result,
                        as: 'result',
                        attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir createdAt y updatedAt
                    },
                ],
                attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir createdAt y updatedAt de Match
                order: [['match_date', 'ASC']], // Ordenar por match_date en forma ascendente
            });

            res.json({ message: 'Listado de todos los partidos', data: matches });
        } catch (error) {
            clog.addLocal(
                'match.controller',
                'getAllMatches',
                'Error al consultar todos los partidos: ' + error,
                'Error al consultar todos los partidos'
            );
            res.status(500).json({ message: 'Error al consultar todos los partidos', data: error.message });
        }
    },

    // Obtener el listado de todos los partidos por round_id
    async getMatchesByRound(req, res) {
        try {
            const { code } = req.params;

            // Obtener el round_id a partir del código
            const round = await Round.findOne({ where: { code } });

            if (!round) {
                return res.status(404).json({ message: `No se encontró la ronda con el código ${code}`, data: null });
            }

            const matches = await Match.findAll({
                where: { round_id: round.id },
                include: [
                    { model: Competition, as: 'competition' },
                    { model: Round, as: 'round' },
                    { model: Team, as: 'homeTeam' },
                    { model: Team, as: 'awayTeam' },
                ],
            });

            res.json({ message: `Listado de todos los partidos para la ronda con código ${code}`, data: matches });
        } catch (error) {
            clog.addLocal(
                'match.controller',
                'getMatchesByRound',
                'Error al consultar partidos por código de ronda: ' + error,
                'Error al consultar partidos por código de ronda'
            );
            res.status(500).json({ message: 'Error al consultar partidos por código de ronda', data: error.message });
        }
    },

    // Obtener la información de 1 partido por su id y con todas sus relaciones
    async getMatchById(req, res) {
        try {
            const { id } = req.params;
            const match = await Match.findByPk(id, {
                include: [
                    { model: Competition, as: 'competition' },
                    { model: Round, as: 'round' },
                    { model: Team, as: 'homeTeam' },
                    { model: Team, as: 'awayTeam' },
                ],
            });

            if (match) {
                res.json({ message: `Información del partido con ID ${id}`, data: match });
            } else {
                res.status(404).json({ message: `Partido con ID ${id} no encontrado`, data: null });
            }
        } catch (error) {
            clog.addLocal(
                'match.controller',
                'getMatchById',
                'Error al consultar partido por id: ' + error,
                'Error al consultar partido por id'
            );
            res.status(500).json({ message: 'Error al consultar partido por id', data: error.message });
        }
    },

    // Crear un partido con sus relaciones enviando el campo competition_id y code correspondiente
    async addMatch(req, res) {
        const transaction = await sequelize.transaction(); // Usar la instancia importada
        try {
            const { home_team_id, away_team_id, competition_id, roundCode, match_date, start_time, field_name } = req.body;

            // Validación: Asegurarse de que todos los campos requeridos estén presentes
            if (!home_team_id || !away_team_id || !competition_id || !roundCode || !match_date || !start_time || !field_name) {
                return res.status(400).json({ message: 'Todos los campos son requeridos', data: null });
            }

            // Validar formato de match_date
            if (isNaN(Date.parse(match_date))) {
                return res.status(400).json({ message: 'Formato de fecha inválido', data: null });
            }

            // Validar formato de start_time
            const timeParts = start_time.split(':');
            if (timeParts.length !== 2 || isNaN(parseInt(timeParts[0])) || isNaN(parseInt(timeParts[1])) || parseInt(timeParts[0]) > 23 || parseInt(timeParts[1]) > 59) {
                return res.status(400).json({ message: 'Formato de hora inválido', data: null });
            }

            // Realizar búsquedas simultáneamente para reducir el tiempo de espera
            const [round, pendingState, field, homeTeam, awayTeam, competition] = await Promise.all([
                Round.findOne({ where: { code: roundCode }, transaction }),
                State.findOne({ where: { name: 'Pendiente' }, transaction }),
                Field.findOne({ where: { name: field_name }, transaction }),
                Team.findOne({ where: { id: home_team_id }, transaction }),
                Team.findOne({ where: { id: away_team_id }, transaction }),
                Competition.findOne({ where: { id: competition_id }, transaction })
            ]);

            if (!round) {
                return res.status(400).json({ message: 'Código de ronda inválido', data: null });
            }

            if (!pendingState) {
                return res.status(400).json({ message: 'Estado "Pendiente" no encontrado', data: null });
            }

            if (!field) {
                return res.status(400).json({ message: 'Campo de juego no encontrado', data: null });
            }

            if (!homeTeam) {
                return res.status(400).json({ message: 'Equipo local no encontrado', data: null });
            }

            if (!awayTeam) {
                return res.status(400).json({ message: 'Equipo visitante no encontrado', data: null });
            }

            if (!competition) {
                return res.status(400).json({ message: 'Competición no encontrada', data: null });
            }

            // Crear el partido dentro de la transacción
            const match = await Match.create({
                home_team_id,
                away_team_id,
                competition_id,
                round_id: round.id,
                match_date: `${match_date}T${start_time}:00`, // Combinar fecha y hora en formato ISO 8601
            }, { transaction });

            // Crear registros en `schedules` y `results` en paralelo
            await Promise.all([
                Schedule.create({
                    match_id: match.id,
                    field_id: field.id,
                    states_id: pendingState.id,
                    start_time,
                }, { transaction }),
                Result.create({
                    match_id: match.id,
                    home_team_score: 0,
                    away_team_score: 0,
                    home_global_score: 0,
                    away_global_score: 0,
                }, { transaction })
            ]);

            // Confirmar la transacción si todo ha ido bien
            await transaction.commit();

            res.status(201).json({ message: 'Partido agregado exitosamente', data: match });
        } catch (error) {
            // Revertir todas las operaciones realizadas dentro de la transacción en caso de error
            await transaction.rollback();

            // Registrar el error
            clog.addLocal(
                'match.controller',
                'addMatch',
                'Error al crear partido: ' + error.message,
                'Error al crear partido'
            );

            // Enviar la respuesta de error al cliente
            res.status(500).json({ message: 'Error al crear partido', data: error.message });
        }
    },

    // Crear varios partidos a la vez con sus relaciones enviando competition_id y code correspondiente
    async addMultipleMatches(req, res) {
        const transaction = await sequelize.transaction(); // Usar la instancia importada
        try {
            const matches = req.body.matches; // Suponiendo que los datos vienen en un array bajo la propiedad "matches"

            // Validar que se ha proporcionado una lista de partidos
            if (!Array.isArray(matches) || matches.length === 0) {
                return res.status(400).json({ message: 'Se requiere una lista de partidos', data: null });
            }

            // Validar todos los partidos en la lista
            for (const matchData of matches) {
                const { home_team_id, away_team_id, competition_id, roundCode, match_date, start_time, field_name } = matchData;

                if (!home_team_id || !away_team_id || !competition_id || !roundCode || !match_date || !start_time || !field_name) {
                    return res.status(400).json({ message: 'Todos los campos son requeridos para todos los partidos', data: null });
                }

                if (isNaN(Date.parse(match_date))) {
                    return res.status(400).json({ message: 'Formato de fecha inválido para uno de los partidos', data: null });
                }

                const timeParts = start_time.split(':');
                if (timeParts.length !== 2 || isNaN(parseInt(timeParts[0])) || isNaN(parseInt(timeParts[1])) || parseInt(timeParts[0]) > 23 || parseInt(timeParts[1]) > 59) {
                    return res.status(400).json({ message: 'Formato de hora inválido para uno de los partidos', data: null });
                }
            }

            // Realizar búsquedas simultáneamente para reducir el tiempo de espera
            const [rounds, pendingStates, fields, homeTeams, awayTeams, competitions] = await Promise.all([
                Round.findAll({ where: { code: matches.map(match => match.roundCode) }, transaction }),
                State.findOne({ where: { name: 'Pendiente' }, transaction }),
                Field.findAll({ where: { name: matches.map(match => match.field_name) }, transaction }),
                Team.findAll({ where: { id: matches.map(match => match.home_team_id) }, transaction }),
                Team.findAll({ where: { id: matches.map(match => match.away_team_id) }, transaction }),
                Competition.findAll({ where: { id: matches.map(match => match.competition_id) }, transaction })
            ]);

            const roundMap = new Map(rounds.map(round => [round.code, round.id]));
            const fieldMap = new Map(fields.map(field => [field.name, field.id]));
            const homeTeamMap = new Map(homeTeams.map(team => [team.id, team]));
            const awayTeamMap = new Map(awayTeams.map(team => [team.id, team]));
            const competitionMap = new Map(competitions.map(competition => [competition.id, competition]));

            const pendingState = pendingStates; // Asume que solo hay un estado "Pendiente"

            const createdMatches = [];

            for (const matchData of matches) {
                const { home_team_id, away_team_id, competition_id, roundCode, match_date, start_time, field_name } = matchData;

                if (!roundMap.has(roundCode)) {
                    return res.status(400).json({ message: `Código de ronda inválido para uno de los partidos`, data: null });
                }

                if (!pendingState) {
                    return res.status(400).json({ message: `Estado "Pendiente" no encontrado`, data: null });
                }

                if (!fieldMap.has(field_name)) {
                    return res.status(400).json({ message: `Campo de juego no encontrado para uno de los partidos`, data: null });
                }

                if (!homeTeamMap.has(home_team_id)) {
                    return res.status(400).json({ message: `Equipo local no encontrado para uno de los partidos`, data: null });
                }

                if (!awayTeamMap.has(away_team_id)) {
                    return res.status(400).json({ message: `Equipo visitante no encontrado para uno de los partidos`, data: null });
                }

                if (!competitionMap.has(competition_id)) {
                    return res.status(400).json({ message: `Competición no encontrada para uno de los partidos`, data: null });
                }

                // Crear el partido dentro de la transacción
                const match = await Match.create({
                    home_team_id,
                    away_team_id,
                    competition_id,
                    round_id: roundMap.get(roundCode),
                    match_date: `${match_date}T${start_time}:00`, // Combinar fecha y hora en formato ISO 8601
                }, { transaction });

                // Crear registros en `schedules` y `results` en paralelo
                await Promise.all([
                    Schedule.create({
                        match_id: match.id,
                        field_id: fieldMap.get(field_name),
                        states_id: pendingState.id,
                        start_time,
                    }, { transaction }),
                    Result.create({
                        match_id: match.id,
                        home_team_score: 0,
                        away_team_score: 0,
                        home_global_score: 0,
                        away_global_score: 0,
                    }, { transaction })
                ]);

                createdMatches.push(match);
            }

            // Confirmar la transacción si todo ha ido bien
            await transaction.commit();

            res.status(201).json({ message: 'Partidos agregados exitosamente', data: createdMatches });
        } catch (error) {
            // Revertir todas las operaciones realizadas dentro de la transacción en caso de error
            await transaction.rollback();

            // Registrar el error
            clog.addLocal(
                'match.controller',
                'addMultipleMatches',
                'Error al crear partidos: ' + error.message,
                'Error al crear partidos'
            );

            // Enviar la respuesta de error al cliente
            res.status(500).json({ message: 'Error al crear partidos', data: error.message });
        }
    },
};
