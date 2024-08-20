const { State } = require('../models'); // Importa el modelo State
const clog = require("./log.controller");

module.exports = {

    // Consultar todos los registros de State
    async getAll(req, res) {
        try {
            // Buscar todos los registros de State
            const states = await State.findAll();
            return res.status(200).json({ message: 'Estado de juego encontrados', data: states });
        } catch (error) {
            console.error('Error al consultar los estados de juego:', error);
            return res.status(500).json({ data: null, message: 'Error al consultar states: ' + error });
        }
    },

    // Consultar un registro de State por ID
    async getStateById(req, res) {
        try {
            const { id } = req.params;

            // Buscar el registro de State por ID
            const state = await State.findByPk(id);

            if (!state) {
                return res.status(404).json({ message: 'State no encontrado' });
            }

            // Responder con el registro encontrado
            return res.status(200).json({ message: 'State encontrado', data: state });
        } catch (error) {
            console.error('Error al consultar states por ID:', error);
            return res.status(500).json({ data: null, message: 'Error al consultar states: ' + error });
        }
    },

    // Agregar un registro de State
    async addState(req, res) {
        try {
            const { name } = req.body;
            const state = await State.create({ name });
            return res.status(200).json({ message: 'State creado con éxito', data: state });
        } catch (error) {
            clog.addLocal("state.controller", "addState", 'Add state error: ' + error, JSON.stringify(req.body));
            return res.status(500).json({ data: null, message: 'Add state error: ' + error });
        }
    },

    // Agregar varios registros de State
    async addMultipleStates(req, res) {
        try {
            const states = req.body.states;

            // Validar que `states` sea un array y no esté vacío
            if (!Array.isArray(states) || states.length === 0) {
                return res.status(400).json({ data: null, message: 'El campo states debe ser un array y no estar vacío.' });
            }

            // Crear múltiples registros de State
            const newStates = await State.bulkCreate(states);
            return res.status(200).json({ message: 'Estados de juego creados con éxito', data: newStates });
        } catch (error) {
            clog.addLocal("state.controller", "addMultipleStates", 'Add multiple states error: ' + error, JSON.stringify(req.body));
            return res.status(500).json({ data: null, message: 'Add multiple states error: ' + error });
        }
    },
};
