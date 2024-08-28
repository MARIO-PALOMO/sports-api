
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   - name: Gestión de Usuarios
 *     description: Servicios de Usuarios
 */

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     tags:
 *       - Gestión de Usuarios
 *     summary: Obtiene todos los usuarios
 *     description: Devuelve una lista de todos los usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: '1'
 *                   username:
 *                     type: string
 *                     example: 'johndoe'
 *                   email:
 *                     type: string
 *                     example: 'johndoe@example.com'
 */
router.get('/getAll', userController.getAll);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - Gestión de Usuarios
 *     summary: Inicia sesión de un usuario
 *     description: Permite a un usuario iniciar sesión con sus credenciales.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'johndoe'
 *               password:
 *                 type: string
 *                 example: 'password123'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', userController.get);

/**
 * @swagger
 * /user/add:
 *   post:
 *     tags:
 *       - Gestión de Usuarios
 *     summary: Agrega un nuevo usuario
 *     description: Permite agregar un nuevo usuario al sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'johndoe'
 *               email:
 *                 type: string
 *                 example: 'johndoe@example.com'
 *               password:
 *                 type: string
 *                 example: 'password123'
 *     responses:
 *       200:
 *         description: Usuario agregado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/add', userController.add);

module.exports = router;