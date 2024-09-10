'use strict';
const { SanctionType } = require('../models');
const clog = require('./log.controller');

module.exports = {

    // Obtener todos los registros
    getAllSanctionTypes: async (req, res) => {
        try {
            const sanctionTypes = await SanctionType.findAll({ order: [['order', 'ASC']] });
            return res.status(200).json({ message: 'Tipos de sanciones encontradas', data: sanctionTypes });
        } catch (error) {
            const errorMessage = `Error al consultar tipos de sanciones: ${error.message}`;
            clog.addLocal('sanctiontype.controller', 'getAllSanctionTypes', errorMessage, JSON.stringify(error));
            return res.status(500).json({ message: errorMessage, data: null });
        }
    },

    // Obtener registro por ID
    getSanctionTypeById: async (req, res) => {
        const { id } = req.params;
        try {
            const sanctionType = await SanctionType.findByPk(id);
            if (!sanctionType) {
                return res.status(200).json({ message: 'Tipo de sanción no encontrado', data: null });
            }
            return res.status(200).json({ message: 'Tipo de sanción encontrado', data: sanctionType });
        } catch (error) {
            const errorMessage = `Error al obtener el tipo de sanción por ID: ${error.message}`;
            clog.addLocal('sanctiontype.controller', 'getSanctionTypeById', errorMessage, JSON.stringify(error));
            return res.status(500).json({ message: errorMessage, data: null });
        }
    },

    // Crear un registro
    addSanctionType: async (req, res) => {
        const { name, description, active } = req.body;
        try {
            const newSanctionType = await SanctionType.create({ name, description, active });
            return res.status(200).json({ message: 'Tipo de sanción creado exitosamente', data: newSanctionType });
        } catch (error) {
            const errorMessage = `Error al crear el tipo de sanción: ${error.message}`;
            clog.addLocal('sanctiontype.controller', 'createSanctionType', errorMessage, JSON.stringify(error));
            return res.status(500).json({ message: errorMessage, data: null });
        }
    },

    // Crear varios registros a la vez
    addMultipleSanctionTypes: async (req, res) => {
        const { sanctionTypes } = req.body;
        try {
            const newSanctionTypes = await SanctionType.bulkCreate(sanctionTypes);
            return res.status(200).json({ message: 'Múltiples tipos de sanción creados exitosamente', data: newSanctionTypes });
        } catch (error) {
            const errorMessage = `Error al crear múltiples tipos de sanción: ${error.message}`;
            clog.addLocal('sanctiontype.controller', 'createMultipleSanctionTypes', errorMessage, JSON.stringify(error));
            return res.status(500).json({ message: errorMessage, data: null });
        }
    },
};
