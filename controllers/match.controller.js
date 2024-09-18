const { Match, Competition, Round, Team, State, Schedule, Result, Field, Player, Goal, Sanction, sequelize } = require('../models');
const logController = require("./log.controller");

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
            console.error('Error al consumir getAllMatches: ', error);
            logController.addLocal('match.controller', 'getAllMatches', 'Error al obtener el listado de los partidos: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener el listado de los partidos, ' + error.message });
        }
    },

    // Obtener el listado de partidos por código de ronda
    async getMatchesByRound(req, res) {
        try {
            const { code } = req.params; // Obtener el código de la ronda del parámetro de la solicitud

            // Encontrar la ronda por su código
            const round = await Round.findOne({ where: { code }, attributes: ['id'] });

            if (!round) {
                return res.status(200).json({ message: 'Ronda no encontrada', data: null });
            }

            // Obtener el listado de partidos para la ronda encontrada
            const matches = await Match.findAll({
                where: { round_id: round.id }, // Filtrar partidos por el ID de la ronda
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

            res.json({ message: 'Listado de partidos de la ronda', data: matches });
        } catch (error) {
            console.error('Error al consumir getMatchesByRound: ', error);
            logController.addLocal('match.controller', 'getMatchesByRound', 'Error al obtener el listado de los partidos filtrados por código de ronda: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener el listado de los partidos filtrados por código de ronda, ' + error.message });
        }
    },

    // Obtener un partido por su ID
    async getMatchById(req, res) {
        try {
            const { id } = req.params; // Obtener el ID del partido del parámetro de la solicitud

            // Buscar el partido por su ID
            const match = await Match.findOne({
                where: { id },
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
            });

            // Verificar si el partido fue encontrado
            if (!match) {
                return res.status(200).json({ message: 'Partido no encontrado', data: null });
            }

            res.json({ message: 'Partido encontrado', data: match });
        } catch (error) {
            console.error('Error al consumir getMatchById: ', error);
            logController.addLocal('match.controller', 'getMatchById', 'Error al obtener un partido por id: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener un partido por id, ' + error.message });
        }
    },

    // Crear un partido con sus relaciones enviando el campo competition_id y code correspondiente
    async addMatch(req, res) {
        const transaction = await sequelize.transaction(); // Usar la instancia importada
        try {
            const { home_team_id, away_team_id, competition_id, roundCode, match_date, start_time, field_name } = req.body;

            // Validación: Asegurarse de que todos los campos requeridos estén presentes
            if (!home_team_id || !away_team_id || !competition_id || !roundCode || !match_date || !start_time || !field_name) {
                return res.status(200).json({ message: 'Todos los campos son requeridos', data: null });
            }

            // Validar formato de match_date
            if (isNaN(Date.parse(match_date))) {
                return res.status(200).json({ message: 'Formato de fecha inválido', data: null });
            }

            // Validar formato de start_time
            const timeParts = start_time.split(':');
            if (timeParts.length !== 2 || isNaN(parseInt(timeParts[0])) || isNaN(parseInt(timeParts[1])) || parseInt(timeParts[0]) > 23 || parseInt(timeParts[1]) > 59) {
                return res.status(200).json({ message: 'Formato de hora inválido', data: null });
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
                return res.status(200).json({ message: 'Código de ronda inválido', data: null });
            }

            if (!pendingState) {
                return res.status(200).json({ message: 'Estado "Pendiente" no encontrado', data: null });
            }

            if (!field) {
                return res.status(200).json({ message: 'Campo de juego no encontrado', data: null });
            }

            if (!homeTeam) {
                return res.status(200).json({ message: 'Equipo local no encontrado', data: null });
            }

            if (!awayTeam) {
                return res.status(200).json({ message: 'Equipo visitante no encontrado', data: null });
            }

            if (!competition) {
                return res.status(200).json({ message: 'Competición no encontrada', data: null });
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

            res.status(200).json({ message: 'Partido agregado exitosamente', data: match });
        } catch (error) {
            // Revertir todas las operaciones realizadas dentro de la transacción en caso de error
            await transaction.rollback();
            console.error('Error al consumir addMatch: ', error);
            logController.addLocal('match.controller', 'addMatch', 'Error al crear un partido: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al crear un partido, ' + error.message });
        }
    },

    // Crear varios partidos a la vez con sus relaciones enviando competition_id y code correspondiente
    async addMultipleMatches(req, res) {
        const transaction = await sequelize.transaction(); // Usar la instancia importada
        try {
            const matches = req.body.matches; // Suponiendo que los datos vienen en un array bajo la propiedad "matches"

            // Validar que se ha proporcionado una lista de partidos
            if (!Array.isArray(matches) || matches.length === 0) {
                return res.status(200).json({ message: 'Se requiere una lista de partidos', data: null });
            }

            // Validar todos los partidos en la lista
            for (const matchData of matches) {
                const { home_team_id, away_team_id, competition_id, roundCode, match_date, start_time, field_name } = matchData;

                if (!home_team_id || !away_team_id || !competition_id || !roundCode || !match_date || !start_time || !field_name) {
                    return res.status(200).json({ message: 'Todos los campos son requeridos para todos los partidos', data: null });
                }

                if (isNaN(Date.parse(match_date))) {
                    return res.status(200).json({ message: 'Formato de fecha inválido para uno de los partidos', data: null });
                }

                const timeParts = start_time.split(':');
                if (timeParts.length !== 2 || isNaN(parseInt(timeParts[0])) || isNaN(parseInt(timeParts[1])) || parseInt(timeParts[0]) > 23 || parseInt(timeParts[1]) > 59) {
                    return res.status(200).json({ message: 'Formato de hora inválido para uno de los partidos', data: null });
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
                    return res.status(200).json({ message: `Código de ronda inválido para uno de los partidos`, data: null });
                }

                if (!pendingState) {
                    return res.status(200).json({ message: `Estado "Pendiente" no encontrado`, data: null });
                }

                if (!fieldMap.has(field_name)) {
                    return res.status(200).json({ message: `Campo de juego no encontrado para uno de los partidos`, data: null });
                }

                if (!homeTeamMap.has(home_team_id)) {
                    return res.status(200).json({ message: `Equipo local no encontrado para uno de los partidos`, data: null });
                }

                if (!awayTeamMap.has(away_team_id)) {
                    return res.status(200).json({ message: `Equipo visitante no encontrado para uno de los partidos`, data: null });
                }

                if (!competitionMap.has(competition_id)) {
                    return res.status(200).json({ message: `Competición no encontrada para uno de los partidos`, data: null });
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

            res.status(200).json({ message: 'Partidos agregados exitosamente', data: createdMatches });
        } catch (error) {
            // Revertir todas las operaciones realizadas dentro de la transacción en caso de error
            await transaction.rollback();
            console.error('Error al consumir addMultipleMatches: ', error);
            logController.addLocal('match.controller', 'addMultipleMatches', 'Error al crear múltiples partidos: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al crear múltiples partidos, ' + error.message });
        }
    },

    // Método para actualizar varios partidos y horarios
    async updateMultipleMatches(req, res) {
        const transaction = await sequelize.transaction(); // Iniciar una transacción
        try {
            const matchesToUpdate = req.body.matches; // Array de partidos

            if (!matchesToUpdate || !Array.isArray(matchesToUpdate) || matchesToUpdate.length === 0) {
                return res.status(200).json({ message: 'Debe proporcionar un array de partidos a actualizar', data: null });
            }

            for (const matchData of matchesToUpdate) {
                const { home_team_name, away_team_name, field_name, match_date, match_time } = matchData;

                // Validar que todos los parámetros están presentes
                if (!home_team_name || !away_team_name || !field_name || !match_date || !match_time) {
                    return res.status(200).json({ message: 'Todos los parámetros son requeridos', data: matchData });
                }

                // Validar que los equipos existen y obtener sus IDs
                const homeTeam = await Team.findOne({ where: { name: home_team_name } }, { transaction });
                const awayTeam = await Team.findOne({ where: { name: away_team_name } }, { transaction });

                if (!homeTeam) {
                    return res.status(200).json({ message: `El equipo local ${home_team_name} no existe`, data: matchData });
                }
                if (!awayTeam) {
                    return res.status(200).json({ message: `El equipo visitante ${away_team_name} no existe`, data: matchData });
                }

                const home_team_id = homeTeam.id;
                const away_team_id = awayTeam.id;

                // Obtener el partido donde coincidan los equipos local y visitante
                const match = await Match.findOne({ where: { home_team_id, away_team_id } }, { transaction });

                if (!match) {
                    return res.status(200).json({ message: 'No se encontró el partido con los equipos proporcionados', data: matchData });
                }

                const match_id = match.id;

                // Validar que la cancha existe y obtener su ID
                const field = await Field.findOne({ where: { name: field_name } }, { transaction });
                if (!field) {
                    return res.status(200).json({ message: `La cancha ${field_name} no existe`, data: matchData });
                }
                const field_id = field.id;

                // Validar y formatear la hora, agregar 0 a la izquierda si es necesario
                const formattedMatchTime = match_time.padStart(5, '0'); // Asegura que el formato sea HH:mm

                // Concatenar la fecha y la hora en formato ISO
                const formattedDateTime = `${match_date}T${formattedMatchTime}:00`;

                // Validar si el formato de fecha es válido usando el constructor Date
                const dateTime = new Date(formattedDateTime);
                if (isNaN(dateTime.getTime())) {
                    return res.status(200).json({ message: 'Formato de fecha o tiempo inválido', data: matchData });
                }

                // Convertir la fecha y hora a UTC utilizando los métodos nativos de JS
                const utcDateTime = new Date(Date.UTC(
                    dateTime.getUTCFullYear(),
                    dateTime.getUTCMonth(),
                    dateTime.getUTCDate(),
                    dateTime.getUTCHours(),
                    dateTime.getUTCMinutes(),
                    dateTime.getUTCSeconds()
                ));

                // Actualizar el partido con la fecha y hora en UTC
                await Match.update(
                    { match_date: utcDateTime.toISOString() }, // Convertir a cadena UTC en formato ISO
                    { where: { id: match_id }, transaction, validate: false }
                );

                // Actualizar la tabla schedules (field_id y start_time)
                await Schedule.update(
                    { field_id, start_time: formattedMatchTime },
                    { where: { match_id }, transaction }
                );
            }

            // Si todas las actualizaciones fueron exitosas, confirmar la transacción
            await transaction.commit();
            return res.status(200).json({ message: 'Los datos de los partidos y horarios han sido actualizados correctamente', data: null });

        } catch (error) {
            // Si hay algún error, revertir todas las actualizaciones
            await transaction.rollback();
            console.error('Error al consumir updateMultipleMatches: ', error);
            logController.addLocal('match.controller', 'updateMultipleMatches', 'Error al actualizar la información de múltiples partidos: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al actualizar la información de múltiples partidos, ' + error.message });
        }
    },

    async updateMatchResultInfo(req, res) {

        const { match_id, home_team_id, away_team_id, home_team_score, away_team_score, home_global_score, away_global_score, goals, sanctions } = req.body;

        if (!match_id || !home_team_id || !away_team_id || home_team_score == null || away_team_score == null || home_global_score == null || away_global_score == null) {
            return res.status(200).json({ message: 'Parámetros faltantes o inválidos', data: null });
        }

        const transaction = await sequelize.transaction(); // Iniciar una transacción

        try {
            // Verificar que el partido (match_id) existe
            const match = await Match.findByPk(match_id, { transaction: transaction });
            if (!match) {
                return res.status(200).json({ data: null, message: 'El partido no existe' });
            }

            // Verificar que los equipos existen y coinciden con el match_id
            const homeTeam = await Team.findByPk(home_team_id, { transaction: transaction });
            const awayTeam = await Team.findByPk(away_team_id, { transaction: transaction });

            if (!homeTeam || !awayTeam) {
                return res.status(200).json({ data: null, message: 'Uno o ambos equipos no existen' });
            }

            if (match.home_team_id !== home_team_id || match.away_team_id !== away_team_id) {
                return res.status(200).json({ data: null, message: 'Los equipos no coinciden con el partido' });
            }

            // Determinar el estado de victoria basado en los puntajes globales y de equipo
            const hasGlobalScore = home_global_score !== 0 || away_global_score !== 0;

            const home_team_win_status = hasGlobalScore
                ? home_global_score > away_global_score
                : home_team_score > away_team_score;

            const away_team_win_status = hasGlobalScore
                ? away_global_score > home_global_score
                : away_team_score > home_team_score;

            // Actualizar los campos de la tabla "matches"
            await match.update(
                { home_team_win_status, away_team_win_status },
                { transaction }
            );

            // Actualizar el estado a "Finalizado" en la tabla "schedules"
            const finalState = await State.findOne({ where: { name: 'Finalizado' }, transaction: transaction });

            if (!finalState) {
                return res.status(200).json({ data: null, message: 'Estado "Finalizado" no encontrado' });
            }

            const schedule = await Schedule.findOne({ where: { match_id }, transaction: transaction });

            if (schedule) {
                await schedule.update({ states_id: finalState.id }, { transaction: transaction });
            }

            // Actualizar los campos en la tabla "results"
            const result = await Result.findOne({ where: { match_id }, transaction: transaction });

            if (result) {
                await result.update({ home_team_score, away_team_score, home_global_score, away_global_score }, { transaction: transaction });
            }

            // Agregar goles en la tabla "goals"
            if (goals && Array.isArray(goals)) {
                for (const goal of goals) {
                    const { player_id } = goal;
                    // Verificar que el jugador sea parte del equipo y del partido
                    const player = await Player.findByPk(player_id, { transaction: transaction });
                    if (!player || (player.team_id !== home_team_id && player.team_id !== away_team_id)) {
                        return res.status(200).json({ data: null, message: `El jugador ${player_id} no es parte de los equipos del partido` });
                    }
                    await Goal.create({ match_id, player_id }, { transaction: transaction });
                }
            }

            // Agregar sanciones en la tabla "sanctions"
            if (sanctions && Array.isArray(sanctions)) {
                for (const sanction of sanctions) {
                    const { player_id, sanction_type_id } = sanction;
                    // Verificar que el jugador sea parte del equipo y del partido
                    const player = await Player.findByPk(player_id, { transaction: transaction });
                    if (!player || (player.team_id !== home_team_id && player.team_id !== away_team_id)) {
                        return res.status(200).json({ data: null, message: `El jugador ${player_id} no es parte de los equipos del partido` });
                    }
                    await Sanction.create({ match_id, player_id, sanction_type_id }, { transaction: transaction });
                }
            }

            // Confirmar la transacción
            await transaction.commit();
            res.status(200).json({ data: null, message: 'Información del partido actualizada con éxito' });

        } catch (error) {
            await transaction.rollback();
            console.error('Error al consumir updateMatchResultInfo: ', error);
            logController.addLocal('match.controller', 'updateMatchResultInfo', 'Error al actualizar la información del resultado del partido: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al actualizar la información del resultado del partido, ' + error.message });
        }
    },

};
