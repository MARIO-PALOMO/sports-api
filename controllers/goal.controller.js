const { Goal, Match, Player, Team, sequelize } = require('../models'); // Asegúrate de que la ruta es correcta
const logController = require("./log.controller");

module.exports = {

  async getTopScorers(req, res) {
    try {
      // Obtener todos los goles agrupados por jugador y contar la cantidad de goles
      const topScorers = await Goal.findAll({
        attributes: [
          'player_id',
          [sequelize.fn('COUNT', sequelize.col('player_id')), 'goalCount'], // Contar la cantidad de goles por jugador
        ],
        include: [
          {
            model: Player,
            as: 'player',
            attributes: ['id', 'name', 'player_number', 'team_id'], // Incluir id, nombre, número del jugador y team_id
            include: [
              {
                model: Team,
                as: 'team',
                attributes: ['id', 'name', 'logo'], // Incluir id y nombre del equipo
              },
            ],
          },
        ],
        group: ['player_id', 'player.id', 'player.team_id', 'player.team.id'], // Agrupar por jugador y equipo
        order: [[sequelize.literal('"goalCount"'), 'DESC']], // Ordenar por cantidad de goles usando comillas dobles para el alias
      });

      // Verificar si se encontraron goleadores
      if (topScorers.length === 0) {
        return res.status(200).json({ message: 'No se encontraron goleadores', data: null });
      }

      // Formatear la respuesta para incluir solo la información solicitada
      const response = topScorers.map((scorer) => ({
        team_id: scorer.player.team.id,
        team_name: scorer.player.team.name,
        team_logo: scorer.player.team.logo,
        player_id: scorer.player.id,
        player_name: scorer.player.name,
        player_number: scorer.player.player_number,
        goal_count: scorer.getDataValue('goalCount'), // Obtener la cantidad de goles calculada
      }));

      // Respuesta con los goleadores encontrados
      res.status(200).json({ message: 'Goleadores encontrados', data: response });
    } catch (error) {
      console.error('Error al consumir getTopScorers: ', error);
      logController.addLocal('goal.controller', 'getTopScorers', 'Error al obtener el listado de goleadores: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
      return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener el listado de goleadores, ' + error.message });
    }
  },

  async getTopFiveScorers(req, res) {
    try {
      // Obtener todos los goles agrupados por jugador y contar la cantidad de goles
      const topScorers = await Goal.findAll({
        attributes: [
          'player_id',
          [sequelize.fn('COUNT', sequelize.col('player_id')), 'goalCount'], // Contar la cantidad de goles por jugador
        ],
        include: [
          {
            model: Player,
            as: 'player',
            attributes: ['id', 'name', 'player_number', 'team_id'], // Incluir id, nombre, número del jugador y team_id
            include: [
              {
                model: Team,
                as: 'team',
                attributes: ['id', 'name', 'logo'], // Incluir id y nombre del equipo
              },
            ],
          },
        ],
        group: ['player_id', 'player.id', 'player.team_id', 'player.team.id'], // Agrupar por jugador y equipo
        order: [[sequelize.literal('"goalCount"'), 'DESC']], // Ordenar por cantidad de goles usando comillas dobles para el alias
        limit: 5, // Limitar a 5 registros
      });
  
      // Verificar si se encontraron goleadores
      if (topScorers.length === 0) {
        return res.status(200).json({ message: 'No se encontraron goleadores', data: null });
      }
  
      // Formatear la respuesta para incluir solo la información solicitada
      const response = topScorers.map((scorer) => ({
        team_id: scorer.player.team.id,
        team_name: scorer.player.team.name,
        team_logo: scorer.player.team.logo,
        player_id: scorer.player.id,
        player_name: scorer.player.name,
        player_number: scorer.player.player_number,
        goal_count: scorer.getDataValue('goalCount'), // Obtener la cantidad de goles calculada
      }));
  
      // Respuesta con los goleadores encontrados
      res.status(200).json({ message: 'Goleadores encontrados', data: response });
    } catch (error) {
      console.error('Error al consumir getTopFiveScorers: ', error);
      logController.addLocal('goal.controller', 'getTopFiveScorers', 'Error al obtener el listado de los 5 mayores goleadores: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
      return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener el listado de los 5 mayores goleadores, ' + error.message });
    }
  },

  async getGoalsByMatch(req, res) {
    try {
      const { match_id } = req.params; // Obtener el match_id desde los parámetros de la solicitud
  
      // Obtener todos los goles agrupados por jugador y contar la cantidad de goles para el partido específico
      const goalsByMatch = await Goal.findAll({
        attributes: [
          'player_id',
          [sequelize.fn('COUNT', sequelize.col('player_id')), 'goalCount'], // Contar la cantidad de goles por jugador
        ],
        include: [
          {
            model: Player,
            as: 'player',
            attributes: ['id', 'name', 'player_number'], // Incluir id, nombre y número del jugador
            include: [
              {
                model: Team,
                as: 'team',
                attributes: ['id', 'name', 'logo'], // Incluir id y nombre del equipo
              },
            ],
          },
        ],
        where: { match_id }, // Filtrar por el partido específico
        group: ['player_id', 'player.id', 'player.team.id'], // Agrupar por jugador y equipo
        order: [[sequelize.literal('"goalCount"'), 'DESC']], // Ordenar por cantidad de goles
      });
  
      // Verificar si se encontraron goles para el partido
      if (goalsByMatch.length === 0) {
        return res.status(200).json({ message: 'No se encontraron goles para este partido', data: null });
      }
  
      // Formatear la respuesta para incluir solo la información solicitada
      const response = goalsByMatch.map((goal) => ({
        match_id,
        team_id: goal.player.team.id,
        team_name: goal.player.team.name,
        team_logo: goal.player.team.logo,
        player_id: goal.player.id,
        player_name: goal.player.name,
        player_number: goal.player.player_number,
        goal_count: goal.getDataValue('goalCount'), // Obtener la cantidad de goles calculada
      }));
  
      // Respuesta con los goles encontrados
      res.status(200).json({ message: 'Goles encontrados para el partido', data: response });
    } catch (error) {
      console.error('Error al consumir getGoalsByMatch: ', error);
      logController.addLocal('goal.controller', 'getGoalsByMatch', 'Error al obtener el listado de goleadores por partido: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
      return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener el listado de goleadores por partido, ' + error.message });
    }
  },  
  
  async getTopScorersByTeam(req, res) {
    try {
      const { team_id } = req.params; // Obtener el team_id desde los parámetros de la solicitud

      // Obtener todos los goles agrupados por jugador y contar la cantidad de goles para el equipo específico
      const topScorers = await Goal.findAll({
        attributes: [
          'player_id',
          [sequelize.fn('COUNT', sequelize.col('player_id')), 'goalCount'], // Contar la cantidad de goles por jugador
        ],
        include: [
          {
            model: Player,
            as: 'player',
            attributes: ['id', 'name', 'player_number', 'team_id'], // Incluir id, nombre, número del jugador y team_id
            where: { team_id }, // Filtrar por el equipo específico
            include: [
              {
                model: Team,
                as: 'team',
                attributes: ['id', 'name'], // Incluir id y nombre del equipo
              },
            ],
          },
        ],
        group: ['player_id', 'player.id', 'player.team_id', 'player.team.id'], // Agrupar por jugador y equipo
        order: [[sequelize.literal('"goalCount"'), 'DESC']], // Ordenar por cantidad de goles usando comillas dobles para el alias
      });

      // Verificar si se encontraron goleadores
      if (topScorers.length === 0) {
        return res.status(200).json({ message: 'No se encontraron goleadores para este equipo', data: null });
      }

      // Formatear la respuesta para incluir solo la información solicitada
      const response = topScorers.map((scorer) => ({
        team_id: scorer.player.team.id,
        team_name: scorer.player.team.name,
        player_id: scorer.player.id,
        player_name: scorer.player.name,
        player_number: scorer.player.player_number,
        goal_count: scorer.getDataValue('goalCount'), // Obtener la cantidad de goles calculada
      }));

      // Respuesta con los goleadores encontrados
      res.status(200).json({ message: 'Goleadores encontrados para el equipo', data: response });
    } catch (error) {
      console.error('Error al consumir getTopScorersByTeam: ', error);
      logController.addLocal('goal.controller', 'getTopScorersByTeam', 'Error al obtener el listado de goleadores por equipo: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
      return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener el listado de goleadores por equipo, ' + error.message });
    }
  },

  async addGoals(req, res) {
    try {
      const { match_id, player_ids } = req.body;

      // Validar que match_id y player_ids no estén vacíos
      if (!match_id || !Array.isArray(player_ids) || player_ids.length === 0) {
        return res.status(200).json({ message: 'El match_id y un array con al menos un player_id son requeridos', data: null });
      }

      // Verificar si el partido con el match_id existe
      const match = await Match.findOne({
        where: { id: match_id },
        include: [
          { model: Team, as: 'homeTeam', attributes: ['id'] },
          { model: Team, as: 'awayTeam', attributes: ['id'] },
        ]
      });

      if (!match) {
        return res.status(200).json({ message: 'Partido no encontrado', data: null });
      }

      // Obtener los equipos que participan en el partido
      const homeTeamId = match.homeTeam.id;
      const awayTeamId = match.awayTeam.id;

      // Verificar si los player_ids pertenecen a los equipos relacionados al match_id
      const players = await Player.findAll({
        where: {
          id: player_ids,
          team_id: [homeTeamId, awayTeamId] // Verificar que pertenezcan a uno de los equipos
        }
      });

      if (players.length !== player_ids.length) {
        return res.status(200).json({ message: 'Algunos jugadores no pertenecen a los equipos del partido', data: null });
      }

      // Crear los registros de goles
      const goals = player_ids.map(player_id => ({ match_id, player_id }));

      // Guardar los goles en la base de datos
      const createdGoals = await Goal.bulkCreate(goals, { returning: true });

      res.status(200).json({ message: 'Goles agregados exitosamente', data: createdGoals });
    } catch (error) {
      console.error('Error al consumir addGoals: ', error);
      logController.addLocal('goal.controller', 'addGoals', 'Error al agregar goles: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
      return res.status(500).json({ data: null, message: 'Ocurrió un error al agregar goles, ' + error.message });
    }
  },
};
