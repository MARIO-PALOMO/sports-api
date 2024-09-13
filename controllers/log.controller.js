const { mlog } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.getAll = async (req, res) => {
    try {
        const logs = await mlog.findAll();
        console.log('All logs retrieved successfully.');
        return res.status(200).json({ data: logs, message: 'Logs retrieved successfully.' });
    } catch (error) {
        console.error('Error retrieving logs:', error);
        return res.status(500).json({ data: null, message: 'Error retrieving logs. Please try again.' });
    }
};

exports.add = async (req, res) => {
    try {
        const { entity, method, error, payload } = req.body;

        // Verificar que todos los campos requeridos están presentes
        if (!entity || !method || !error || !payload) {
            return res.status(200).json({ data: null, message: 'All fields (entity, method, error, payload) are required.' });
        }

        const logEntry = await mlog.create({
            id: uuidv4(),
            entity,
            method,
            error,
            payload,
        });

        console.log(`Log added successfully for entity: ${entity}, method: ${method}`);
        return res.status(200).json({ data: logEntry, message: 'Log added successfully.' });

    } catch (err) {
        console.error('Error adding log:', err);
        return res.status(500).json({ data: null, message: 'Error adding log. Please try again.' });
    }
};

exports.addLocal = async (entity, method, error, payload) => {
    try {
        // Verificar que todos los campos requeridos están presentes
        if (!entity || !method || !error || !payload) {
            console.error('All fields (entity, method, error, payload) are required.');
            return;
        }

        const logEntry = await mlog.create({
            id: uuidv4(),
            entity,
            method,
            error,
            payload,
        });

        console.log(`Local log added successfully for entity: ${entity}, method: ${method}`);
    } catch (err) {
        console.error('Error adding local log:', err);
    }
};
