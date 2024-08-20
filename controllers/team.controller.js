const { Team } = require('../models');
const clog = require('./log.controller');
const { getRandomLogo } = require('../imageHelper.js');

module.exports = {

  // Consultar todos los equipos
  async getAll(req, res) {
    try {
      const teams = await Team.findAll();
      return res.status(200).json({ message: 'Equipos encontrados', data: teams });
    } catch (error) {
      console.error('Error al consultar los equipos:', error);
      return res.status(500).json({ data: null, message: 'Error al consultar equipos: ' + error.message });
    }
  },

  // Leer un equipo por id
  async getTeamById(req, res) {
    try {
      const team = await Team.findByPk(req.params.id);
      if (!team) return res.status(404).json({ message: 'Equipo no encontrado', data: null });
      return res.status(200).json({ message: 'Equipo encontrado', data: team });
    } catch (error) {
      console.error('Error al consultar el equipo:', error);
      return res.status(500).json({ data: null, message: 'Error al consultar equipo: ' + error.message });
    }
  },

  // Crear un equipo
  async addTeam(req, res) {
    try {
      const logo = getRandomLogo();
      const newTeam = await Team.create({ ...req.body, logo });
      return res.status(201).json({ message: 'Equipo creado exitosamente', data: newTeam });
    } catch (error) {
      console.error('Error al crear el equipo:', error);
      return res.status(500).json({ data: null, message: 'Error al crear equipo: ' + error.message });
    }
  },

  // Crear múltiples equipos
  async addMultipleTeams(req, res) {
    try {
      const teamsData = req.body.map(team => ({ ...team, logo: getRandomLogo() }));
      const newTeams = await Team.bulkCreate(teamsData);
      return res.status(201).json({ message: 'Equipos creados exitosamente', data: newTeams });
    } catch (error) {
      console.error('Error al crear los equipos:', error);
      return res.status(500).json({ data: null, message: 'Error al crear equipos: ' + error.message });
    }
  },

  // Actualizar campos name, coach por ID
  async updateTeamDetails(req, res) {
    try {
      const { id } = req.params;
      const { name, coach } = req.body;
      const team = await Team.findByPk(id);

      if (!team) {
        return res.status(404).json({ data: null, message: 'Equipo no encontrado' });
      }

      await team.update({ name, coach });
      return res.status(200).json({ message: 'Detalles actualizados con éxito', data: team });
    } catch (error) {
      clog.addLocal('team.controller', 'updateTeamDetails', 'Error al actualizar detalles del equipo: ' + error);
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
        return res.status(404).json({ data: null, message: 'Equipo no encontrado' });
      }

      await team.update({ logo });
      return res.status(200).json({ message: 'Logo actualizado con éxito', data: team });
    } catch (error) {
      clog.addLocal('team.controller', 'updateTeamLogo', 'Error al actualizar logo: ' + error);
      return res.status(500).json({ data: null, message: 'Error al actualizar logo: ' + error });
    }
  },

  // Actualizar campos del equipo
  async updateTeamInfo(req, res) {
    try {
      const { id } = req.params;
      const { name, coach, logo } = req.body;

      const team = await Team.findByPk(id);
      if (!team) return res.status(404).json({ message: 'Equipo no encontrado', data: null });

      if (name || coach) await team.update({ name, coach });
      if (logo) await team.update({ logo: getRandomLogo() });

      return res.status(200).json({ message: 'Equipo actualizado exitosamente', data: team });
    } catch (error) {
      console.error('Error al actualizar el equipo:', error);
      return res.status(500).json({ data: null, message: 'Error al actualizar equipo: ' + error.message });
    }
  },

  // Eliminar un equipo por id
  async deleteTeam(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Team.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ message: 'Equipo no encontrado', data: null });
      return res.status(200).json({ message: 'Equipo eliminado exitosamente', data: null });
    } catch (error) {
      console.error('Error al eliminar el equipo:', error);
      return res.status(500).json({ data: null, message: 'Error al eliminar equipo: ' + error.message });
    }
  },
};
