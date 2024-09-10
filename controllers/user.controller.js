const { user, rol } = require("../models");
const { v4: uuidv4 } = require("uuid");
const clog = require("./log.controller");
//const { where } = require("sequelize");

exports.getAll = async (req, res, next) => {
    try {
        const users = await user.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: rol,
                    as: 'rol',
                    attributes: ['id', 'name'],
                },
            ],
        })

        return res.status(200).json({ data: users, message: 'Success' });
    } catch (error) {
        clog.addLocal("user.controller", "login", 'Error al obtener usuarios: ' + error, JSON.stringify(req));
        return res.status(500).json({ data: null, message: 'Get all logs error: ' + error });
    }
};

exports.get = async (req, res, next) => {
    try {
        const users = await user.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: rol,
                    as: 'rol',
                    attributes: ['id', 'name'],
                },
            ],
            where: {
                mail: req.body?.mail,
                password: req.body?.password
            }
        })

        var result = users.length > 0 ? users[0] : null;

        return res.status(200).json({ data: result, message: 'Success' });
    } catch (error) {
        clog.addLocal("user.controller", "login", 'Error al autenticar usuario: ' + error, JSON.stringify(req.body));
        return res.status(500).json({ data: null, message: 'Get all logs error: ' + error });
    }
};

exports.add = async (req, res, next) => {
    try {

        const rol_id = req.body?.rol_id;
        const name = req.body?.name;
        const mail = req.body?.mail;
        const password = req.body?.password;
        const photo = req.body?.photo;
        const active = req.body?.active;

        if (!rol_id || !name || !mail || !password || !photo || !active) {
            return res.status(200).json({ data: null, message: 'All fields are required' });
        }
        const add = await user.create({
            id: uuidv4(),
            rol_id,
            name,
            mail,
            password,
            photo,
            active
        });

        return res.status(200).json({ data: add, message: 'Success' });
    } catch (error) {

        clog.addLocal("user.controller", "add", 'Error al agregar usuario: ' + error, JSON.stringify(req.body));
        return res.status(500).json({ data: null, message: 'Add user error: ' + error });
    }
};