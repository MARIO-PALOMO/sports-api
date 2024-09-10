const { Team } = require('../models');
const clog = require('./log.controller');
const { getRandomLogo } = require('../imageHelper.js');
const { getLogoBase64 } = require('../imageHelper.js');

module.exports = {

  // Consultar todos los equipos activos
  async getAll(req, res) {
    try {
      const teams = await Team.findAll({ where: { active: true } });
      return res.status(200).json({ message: 'Equipos encontrados', data: teams });
    } catch (error) {
      clog.addLocal('team.controller', 'getAll', 'Error al consultar los equipos: ' + error, JSON.stringify(req));
      return res.status(500).json({ data: null, message: 'Error al consultar equipos: ' + error });
    }
  },

  // Leer un equipo activo por id
  async getTeamById(req, res) {
    try {
      const team = await Team.findByPk(req.params.id);
      if (!team) return res.status(200).json({ message: 'Equipo no encontrado', data: null });
      if (!team.active) return res.status(200).json({ message: 'Equipo no activo', data: null });
      return res.status(200).json({ message: 'Equipo encontrado', data: team });
    } catch (error) {
      clog.addLocal('team.controller', 'getTeamById', 'Error al consultar el equipo: ' + error, JSON.stringify(req));
      return res.status(500).json({ data: null, message: 'Error al consultar equipo: ' + error });
    }
  },

  // Crear un equipo
  async addTeam(req, res) {
    try {
      const logo = getRandomLogo();
      const newTeam = await Team.create({ ...req.body, logo });
      return res.status(200).json({ message: 'Equipo creado exitosamente', data: newTeam });
    } catch (error) {
      clog.addLocal('team.controller', 'addTeam', 'Error al crear el equipo: ' + error, JSON.stringify(req));
      return res.status(500).json({ data: null, message: 'Error al crear equipo: ' + error });
    }
  },

  // Crear múltiples equipos
  async addMultipleTeams(req, res) {
    try {
      const teamsData = req.body.map(team => ({ ...team, logo: getRandomLogo() }));
      const newTeams = await Team.bulkCreate(teamsData);
      return res.status(200).json({ message: 'Equipos creados exitosamente', data: newTeams });
    } catch (error) {
      clog.addLocal('team.controller', 'addMultipleTeams', 'Error al crear los equipos: ' + error, JSON.stringify(req));
      return res.status(500).json({ data: null, message: 'Error al crear equipos: ' + error });
    }
  },

  // Crear múltiples equipos con logos en base64
  async addMultipleTeamsLogo(req, res) {
    try {
      // Mapea los datos de equipos, generando el logo base64 a partir del nombre del archivo
      const teamsData = req.body.map(team => {
        if (!team.logo) {
          throw new Error('El campo "logo" es obligatorio en cada equipo');
        }
        const logoBase64 = getLogoBase64(team.logo);
        return { ...team, logo: logoBase64 };
      });

      // Crea los equipos en la base de datos
      const newTeams = await Team.bulkCreate(teamsData);

      return res.status(200).json({ message: 'Equipos creados exitosamente', data: newTeams });
    } catch (error) {
      // Manejo de errores y logging
      clog.addLocal('team.controller', 'addMultipleTeamsLogo', `Error al crear los equipos: ${error.message}`, JSON.stringify(req.body));
      return res.status(500).json({ data: null, message: `Error al crear equipos: ${error.message}` });
    }
  },

  // Actualizar campos name, coach por ID
  async updateTeamDetails(req, res) {
    try {
      const { id } = req.params;
      const { name, coach } = req.body;
      const team = await Team.findByPk(id);

      if (!team) {
        return res.status(200).json({ data: null, message: 'Equipo no encontrado' });
      }

      await team.update({ name, coach });
      return res.status(200).json({ message: 'Detalles actualizados con éxito', data: team });
    } catch (error) {
      clog.addLocal('team.controller', 'updateTeamDetails', 'Error al actualizar detalles del equipo: ' + error, JSON.stringify(req.body));
      return res.status(500).json({ data: null, message: 'Error al actualizar detalles del equipo: ' + error });
    }
  },

  // Actualizar campo logo por ID
  async updateTeamLogo(req, res) {
    try {
      const { id } = req.params;
      const { logo } = req.body;
      const team = await Team.findByPk(id);

      if (!team) {
        return res.status(200).json({ data: null, message: 'Equipo no encontrado' });
      }

      await team.update({ logo });
      return res.status(200).json({ message: 'Logo actualizado con éxito', data: team });
    } catch (error) {
      clog.addLocal('team.controller', 'updateTeamLogo', 'Error al actualizar logo: ' + error, JSON.stringify(req.body));
      return res.status(500).json({ data: null, message: 'Error al actualizar logo: ' + error });
    }
  },

  // Actualizar campos del equipo
  async updateTeamInfo(req, res) {
    try {
      const { id } = req.params;
      const { name, coach, logo } = req.body;

      const team = await Team.findByPk(id);
      if (!team) return res.status(200).json({ message: 'Equipo no encontrado', data: null });

      if (name || coach) await team.update({ name, coach });
      if (logo) await team.update({ logo: getRandomLogo() });

      return res.status(200).json({ message: 'Equipo actualizado exitosamente', data: team });
    } catch (error) {
      clog.addLocal('team.controller', 'updateTeamInfo', 'Error al actualizar el equipo: ' + error, JSON.stringify(req));
      return res.status(500).json({ data: null, message: 'Error al actualizar equipo: ' + error });
    }
  },

  // Eliminar un equipo por id
  async deleteTeam(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Team.destroy({ where: { id } });
      if (!deleted) return res.status(200).json({ message: 'Equipo no encontrado', data: null });
      return res.status(200).json({ message: 'Equipo eliminado exitosamente', data: null });
    } catch (error) {
      clog.addLocal('team.controller', 'deleteTeam', 'Error al eliminar el equipo: ' + error, JSON.stringify(req));
      return res.status(500).json({ data: null, message: 'Error al eliminar equipo: ' + error });
    }
  },
};
