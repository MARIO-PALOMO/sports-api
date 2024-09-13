const { Field } = require('../models'); // Importa el modelo Field
const logController = require("./log.controller");

module.exports = {

    // Consultar todos los registros de Field
    async getAll(req, res) {
        try {
            // Buscar todos los registros de Field
            const fields = await Field.findAll();
            return res.status(200).json({ message: 'Canchas deportivas encontradas', data: fields });
        } catch (error) {
            console.error('Error al consumir getAll: ', error);
            logController.addLocal('field.controller', 'getAll', 'Error al obtener las chancas deportivas: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener las chancas deportivas, ' + error.message });
        }
    },

    // Consultar un registro de Field por ID
    async getFieldById(req, res) {
        try {
            const { id } = req.params;

            // Buscar el registro de Field por ID
            const field = await Field.findByPk(id);

            if (!field) {
                return res.status(200).json({ data: null, message: 'Cancha Deportiva no encontrada' });
            }

            // Responder con el registro encontrado
            return res.status(200).json({ message: 'Cancha Deportiva encontrada', data: field });
        } catch (error) {
            console.error('Error al consumir getFieldById: ', error);
            logController.addLocal('field.controller', 'getFieldById', 'Error al obtener la cancha deportiva por id: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al obtener la cancha deportiva por id, ' + error.message });
        }
    },

    // Agregar un registro de Field
    async addField(req, res) {
        try {
            const field = await Field.create(req.body);
            return res.status(200).json({ message: 'Cancha deportiva creada con éxito', data: field });
        } catch (error) {
            console.error('Error al consumir addField: ', error);
            logController.addLocal('field.controller', 'addField', 'Error al agregar cancha deportiva: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al agregar cancha deportiva, ' + error.message });
        }
    },

    // Agregar varios registros de Field
    async addMultipleFields(req, res) {
        try {
            const fields = req.body.fields;

            // Validar que `fields` sea un array y no esté vacío
            if (!Array.isArray(fields) || fields.length === 0) {
                return res.status(200).json({ data: null, message: 'El campo fields debe ser un array y no estar vacío.' });
            }

            // Crear múltiples registros de Field
            const newFields = await Field.bulkCreate(fields);
            return res.status(200).json({ message: 'Canchas deportivas creadas con éxito', data: newFields });
        } catch (error) {
            console.error('Error al consumir addMultipleFields: ', error);
            logController.addLocal('field.controller', 'addMultipleFields', 'Error al agregar múltiples canchas deportivas: ' + error.message, JSON.stringify({ params: req.params, body: req.body }));
            return res.status(500).json({ data: null, message: 'Ocurrió un error al agregar múltiples canchas deportivas, ' + error.message });
        }
    },
};
