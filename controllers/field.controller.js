const { Field } = require('../models'); // Importa el modelo Field
const clog = require("./log.controller");

module.exports = {

    // Consultar todos los registros de Field
    async getAll(req, res) {
        try {
            // Buscar todos los registros de Field
            const fields = await Field.findAll();
            return res.status(200).json({ message: 'Canchas deportivas encontradas', data: fields });
        } catch (error) {
            clog.addLocal("field.controller", "getAll", 'Error al consultar las canchas deportivas: ' + error, JSON.stringify(req));
            return res.status(500).json({ data: null, message: 'Error al consultar las canchas deportivas: ' + error });
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
            clog.addLocal("field.controller", "getFieldById", 'Error al consultar cancha deportivas: ' + error, JSON.stringify(req));
            return res.status(500).json({ data: null, message: 'Error al consultar cancha deportivas: ' + error });
        }
    },

    // Agregar un registro de Field
    async addField(req, res) {
        try {
            const field = await Field.create(req.body);
            return res.status(200).json({ message: 'Cancha deportiva creada con éxito', data: field });
        } catch (error) {
            clog.addLocal("field.controller", "addField", 'Add field error: ' + error, JSON.stringify(req.body));
            return res.status(500).json({ data: null, message: 'Error al crear cancha deportiva: ' + error });
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
            clog.addLocal("field.controller", "addMultipleFields", 'Add multiple fields error: ' + error, JSON.stringify(req.body));
            return res.status(500).json({ data: null, message: 'Error al agregar múltiples canchas deportivas: ' + error });
        }
    },
};
