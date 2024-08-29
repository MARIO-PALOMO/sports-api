const { Goal, Match, Player, Team } = require('../models'); // Asegúrate de que la ruta es correcta
const clog = require("./log.controller");

module.exports = {

  async addGoals(req, res) {
    try {
      const { match_id, player_ids } = req.body;

      // Validar que match_id y player_ids no estén vacíos
      if (!match_id || !Array.isArray(player_ids) || player_ids.length === 0) {
        return res.status(400).json({ message: 'El match_id y un array con al menos un player_id son requeridos', data: null });
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
        return res.status(404).json({ message: 'Partido no encontrado', data: null });
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
        return res.status(400).json({ message: 'Algunos jugadores no pertenecen a los equipos del partido', data: null });
      }

      // Crear los registros de goles
      const goals = player_ids.map(player_id => ({ match_id, player_id }));

      // Guardar los goles en la base de datos
      const createdGoals = await Goal.bulkCreate(goals, { returning: true });

      res.status(201).json({ message: 'Goles agregados exitosamente', data: createdGoals });
    } catch (error) {
      clog.addLocal(
        'goal.controller',
        'addGoals',
        'Error al agregar los goles: ' + error,
        'Error al agregar los goles'
      );
      res.status(500).json({ message: 'Error al agregar los goles', data: error.message });
    }
  },
};
