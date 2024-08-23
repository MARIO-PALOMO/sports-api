const { Competition } = require('../models');
const clog = require('./log.controller');

module.exports = {

    // Consultar todos los registros de Competitions
    async getAllCompetitions(req, res) {
        try {
            const competitions = await Competition.findAll();
            return res.status(200).json({ message: 'Campeonatos encontradas', data: competitions });
        } catch (error) {
            clog.addLocal('competition.controller', 'getAllCompetitions', 'Error al consultar competiciones: ' + error, JSON.stringify(req));
            return res.status(500).json({ data: null, message: 'Error al consultar competitions: ' + error });
        }
    },

    // Consultar un registro de Competition por ID
    async getCompetitionById(req, res) {
        try {
            const { id } = req.params;
            const competition = await Competition.findByPk(id);
            if (!competition) {
                return res.status(404).json({ data: null, message: 'Campeonato no encontrado' });
            }
            return res.status(200).json({ message: 'Campeonato encontrado', data: competition });
        } catch (error) {
            clog.addLocal('competition.controller', 'getCompetitionById', 'Error al consultar competicion: ' + error, JSON.stringify(req));
            return res.status(500).json({ data: null, message: 'Error al consultar competicion: ' + error });
        }
    },

    // Crear un nuevo registro de Competition
    async addCompetition(req, res) {
        try {
            const competition = await Competition.create(req.body);
            return res.status(200).json({ message: 'Campeonato creado con éxito', data: competition });
        } catch (error) {
            clog.addLocal('competition.controller', 'addCompetition', 'Error al crear competicion: ' + error, JSON.stringify(req.body));
            return res.status(500).json({ data: null, message: 'Error al crear competicion: ' + error });
        }
    },

    // Actualizar campos name, description, organizer por ID
    async updateCompetitionDetails(req, res) {
        try {
            const { id } = req.params;
            const { name, description, organizer } = req.body;
            const competition = await Competition.findByPk(id);

            if (!competition) {
                return res.status(404).json({ data: null, message: 'Campeonato no encontrado' });
            }

            await competition.update({ name, description, organizer });
            return res.status(200).json({ message: 'Detalles actualizados con éxito', data: competition });
        } catch (error) {
            clog.addLocal('competition.controller', 'updateCompetitionDetails', 'Error al actualizar competition: ' + error, JSON.stringify(req.body));
            return res.status(500).json({ data: null, message: 'Error al actualizar competition: ' + error });
        }
    },

    // Actualizar campos start_date, end_date por ID
    async updateCompetitionDates(req, res) {
        try {
            const { id } = req.params;
            const { start_date, end_date } = req.body;
            const competition = await Competition.findByPk(id);

            if (!competition) {
                return res.status(404).json({ data: null, message: 'Campeonato no encontrado' });
            }

            await competition.update({ start_date, end_date });
            return res.status(200).json({ message: 'Fechas actualizadas con éxito', data: competition });
        } catch (error) {
            clog.addLocal('competition.controller', 'updateCompetitionDates', 'Error al actualizar fechas: ' + error, JSON.stringify(req.body));
            return res.status(500).json({ data: null, message: 'Error al actualizar fechas: ' + error });
        }
    },

    // Actualizar campo logo por ID
    async updateCompetitionLogos(req, res) {
        try {
            const { id } = req.params;
            const { logo_1, logo_2 } = req.body;
            const competition = await Competition.findByPk(id);

            if (!competition) {
                return res.status(404).json({ data: null, message: 'Campeonato no encontrado' });
            }

            await competition.update({ logo_1, logo_2 });
            return res.status(200).json({ message: 'Logos actualizado con éxito', data: competition });
        } catch (error) {
            clog.addLocal('competition.controller', 'updateCompetitionLogos', 'Error al actualizar logos: ' + error, JSON.stringify(req.body));
            return res.status(500).json({ data: null, message: 'Error al actualizar logos: ' + error });
        }
    },

    // Actualizar todos los campos por ID
    async updateCompetitionInfo(req, res) {
        try {
            const { id } = req.params;
            const competition = await Competition.findByPk(id);

            if (!competition) {
                return res.status(404).json({ data: null, message: 'Campeonato no encontrado' });
            }

            await competition.update(req.body);
            return res.status(200).json({ message: 'Información actualizada con éxito', data: competition });
        } catch (error) {
            clog.addLocal('competition.controller', 'updateCompetitionInfo', 'Error al actualizar competition: ' + error, JSON.stringify(req.body));
            return res.status(500).json({ data: null, message: 'Error al actualizar competition: ' + error });
        }
    }
};
