const { mlog } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.getAll = async (req, res, next) => {
    try {
        const logs = await mlog.findAll();
        return res.status(200).json({ data: logs, message: 'Success' });
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({ data: null, message: 'Get all logs error: ' + error });
    }
};

exports.add = async (req, res, next) => {
    try {

        const entity = req.body?.entity;
        const method = req.body?.method;
        const error = req.body?.error;
        const payload = req.body?.payload;

        if (!entity || !method || !error || !error || !payload) {
            return res.status(400).json({ data: null, message: 'All fields are required' });
        }
        const add = await mlog.create({
            id: uuidv4(),
            entity,
            method,
            error,
            payload
        });

        return res.status(200).json({ data: add, message: 'Success' });
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({ data: null, message: 'Add logs error: ' + error });
    }
};

exports.addLocal = async (entity, method, error, payload) => {
    try {

        if (!entity || !method || !error || !error || !payload) {
            return res.status(400).json({ data: null, message: 'All fields are required' });
        }
        const add = await mlog.create({
            id: uuidv4(),
            entity,
            method,
            error,
            payload
        });

    } catch (error) {
        console.log('Error', error);
    }
};