const { Round } = require('../models'); // Importa el modelo Round
const clog = require("./log.controller");

module.exports = {

    // Consultar todos los registros de Eliminatorias
    async getAll(req, res) {
        try {
            // Buscar todos los registros de Eliminatorias
            const rounds = await Round.findAll({ order: [['code', 'DESC']] });
            return res.status(200).json({ message: 'Eliminatorias encontradas', data: rounds });
        } catch (error) {
            clog.addLocal("round.controller", "addRound", 'Error al consultar todas las eliminatorias: ' + error, JSON.stringify(req));
            return res.status(500).json({ data: null, message: 'Error al consultar los registros de eliminatorias: ' + error });
        }
    },

    // Consultar un registro de Eliminatoria por ID
    async getRoundById(req, res) {
        try {
            const { id } = req.params;
            const round = await Round.findByPk(id);
            if (!round) {
                return res.status(200).json({ message: 'Eliminatoria no encontrado', data: null });
            }
            return res.status(200).json({ message: 'Eliminatoria encontrada', data: round });
        } catch (error) {
            clog.addLocal("round.controller", "addRound", 'Error al consultar la eliminatoria por ID: ' + error, JSON.stringify(req));
            return res.status(500).json({ data: null, message: 'Error al consultar eliminatoria: ' + error });
        }
    },

    // Agregar un registro de Eliminatoria
    async addRound(req, res) {
        try {
            const round = await Round.create(req.body);
            return res.status(200).json({ message: 'Eliminatoria creada con éxito', data: round });
        } catch (error) {
            clog.addLocal("round.controller", "addRound", 'Add round error: ' + error, JSON.stringify(req.body));
            return res.status(500).json({ data: null, message: 'Add round error: ' + error });
        }
    },

    // Agregar varios registros de Eliminatorias
    async addMultipleRounds(req, res) {
        try {
            const rounds = req.body.rounds;

            // Validar que `rounds` sea un array y no esté vacío
            if (!Array.isArray(rounds) || rounds.length === 0) {
                return res.status(200).json({ data: null, message: 'El campo rounds debe ser un array y no estar vacío.' });
            }

            // Crear múltiples registros de Round
            const newRounds = await Round.bulkCreate(rounds);
            return res.status(200).json({ message: 'Eliminatorias creadas con éxito', data: newRounds });
        } catch (error) {
            clog.addLocal("round.controller", "addMultipleRounds", 'Add multiple rounds error: ' + error, JSON.stringify(req.body));
            return res.status(500).json({ data: null, message: 'Add multiple rounds error: ' + error });
        }
    },
};
