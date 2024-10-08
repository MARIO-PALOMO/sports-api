const { Competition } = require('../models');
const logController = require('./log.controller');

module.exports = {

    // Consultar todos los registros de Competitions
    async getAllCompetitions(req, res) {
        try {
            const competitions = await Competition.findAll();
            return res.status(200).json({ message: 'Campeonatos encontradas', data: competitions });
        } catch (error) {
            console.error('Error al consumir getAllCompetitions: ', error);
            logController.addLocal('competition.controller', 'getAllCompetitions', 'Error al consultar las competiciones: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener las competiciones, ' + error.message });
        }
    },

    // Consultar un registro de Competition por ID
    async getCompetitionById(req, res) {
        try {
            const { id } = req.params;
            const competition = await Competition.findByPk(id);
            if (!competition) {
                return res.status(200).json({ data: null, message: 'Campeonato no encontrado' });
            }
            return res.status(200).json({ message: 'Campeonato encontrado', data: competition });
        } catch (error) {
            console.error('Error al consumir getCompetitionById: ', error);
            logController.addLocal('competition.controller', 'getCompetitionById', 'Error al consultar competición por id: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener la competición por id, ' + error.message });
        }
    },

    // Crear un nuevo registro de Competition
    async addCompetition(req, res) {
        try {
            const competition = await Competition.create(req.body);
            return res.status(200).json({ message: 'Campeonato creado con éxito', data: competition });
        } catch (error) {
            console.error('Error al consumir addCompetition: ', error);
            logController.addLocal('competition.controller', 'addCompetition', 'Error al agregar competicón: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al agregar competición, ' + error.message });
        }
    },

    // Actualizar campos name, description, organizer por ID
    async updateCompetitionDetails(req, res) {
        try {
            const { id } = req.params;
            const { name, description, organizer } = req.body;
            const competition = await Competition.findByPk(id);

            if (!competition) {
                return res.status(200).json({ data: null, message: 'Campeonato no encontrado' });
            }

            await competition.update({ name, description, organizer });
            return res.status(200).json({ message: 'Detalles actualizados con éxito', data: competition });
        } catch (error) {
            console.error('Error al consumir updateCompetitionDetails: ', error);
            logController.addLocal('competition.controller', 'updateCompetitionDetails', 'Error al actualizar los detalles de la competicón: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al actualizar los datos de la competicón, ' + error.message });
        }
    },

    // Actualizar campos start_date, end_date por ID
    async updateCompetitionDates(req, res) {
        try {
            const { id } = req.params;
            const { start_date, end_date } = req.body;
            const competition = await Competition.findByPk(id);

            if (!competition) {
                return res.status(200).json({ data: null, message: 'Campeonato no encontrado' });
            }

            await competition.update({ start_date, end_date });
            return res.status(200).json({ message: 'Fechas actualizadas con éxito', data: competition });
        } catch (error) {
            console.error('Error al consumir updateCompetitionDates: ', error);
            logController.addLocal('competition.controller', 'updateCompetitionDates', 'Error al actualizar las fechas de la competicón: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al actualizar las fechas de la competicón, ' + error.message });
        }
    },

    // Actualizar campo logo por ID
    async updateCompetitionLogos(req, res) {
        try {
            const { id } = req.params;
            const { logo_1, logo_2 } = req.body;
            const competition = await Competition.findByPk(id);

            if (!competition) {
                return res.status(200).json({ data: null, message: 'Campeonato no encontrado' });
            }

            await competition.update({ logo_1, logo_2 });
            return res.status(200).json({ message: 'Logos actualizado con éxito', data: competition });
        } catch (error) {
            console.error('Error al consumir updateCompetitionLogos: ', error);
            logController.addLocal('competition.controller', 'updateCompetitionLogos', 'Error al actualizar los logos de la competicón: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al actualizar los logos de la competicón, ' + error.message });
        }
    },

    // Actualizar todos los campos por ID
    async updateCompetitionInfo(req, res) {
        try {
            const { id } = req.params;
            const competition = await Competition.findByPk(id);

            if (!competition) {
                return res.status(200).json({ data: null, message: 'Campeonato no encontrado' });
            }

            await competition.update(req.body);
            return res.status(200).json({ message: 'Información actualizada con éxito', data: competition });
        } catch (error) {
            console.error('Error al consumir updateCompetitionInfo: ', error);
            logController.addLocal('competition.controller', 'updateCompetitionInfo', 'Error al actualizar la información de la competicón: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al actualizar la información de la competicón, ' + error.message });
        }
    }
};
