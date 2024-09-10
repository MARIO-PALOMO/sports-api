const express = require("express");
const router = express.Router();
const logController = require("../controllers/log.controller");

/**
 * @swagger
 * tags:
 *   - name: Registro
 *     description: Servicios de Log
 */

/**
 * @swagger
 * /log/getAll:
 *   get:
 *     tags:
 *       - Registro
 *     summary: Obtiene todos los registros de logs
 *     description: Devuelve una lista de todos los registros de logs.
 *     responses:
 *       200:
 *         description: Lista de registros de logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 'a-unique-id'
 *                       entity:
 *                         type: string
 *                         example: 'User'
 *                       method:
 *                         type: string
 *                         example: 'POST'
 *                       error:
 *                         type: string
 *                         example: 'None'
 *                       payload:
 *                         type: string
 *                         example: '{"key": "value"}'
 *                 message:
 *                   type: string
 *                   example: 'Success'
 *       500:
 *         description: Error interno del servidor al obtener los registros de logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: 'Get all logs error: [error details]'
 */
router.get('/getAll', logController.getAll);

/**
 * @swagger
 * /log/add:
 *   post:
 *     tags:
 *       - Registro
 *     summary: Agrega un nuevo registro de log
 *     description: Permite agregar un nuevo registro de log con los detalles especificados en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entity:
 *                 type: string
 *                 example: 'User'
 *               method:
 *                 type: string
 *                 example: 'POST'
 *               error:
 *                 type: string
 *                 example: 'None'
 *               payload:
 *                 type: string
 *                 example: '{"key": "value"}'
 *             required:
 *               - entity
 *               - method
 *               - error
 *               - payload
 *     responses:
 *       200:
 *         description: Registro de log agregado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 'a-unique-id'
 *                     entity:
 *                       type: string
 *                       example: 'User'
 *                     method:
 *                       type: string
 *                       example: 'POST'
 *                     error:
 *                       type: string
 *                       example: 'None'
 *                     payload:
 *                       type: string
 *                       example: '{"key": "value"}'
 *                 message:
 *                   type: string
 *                   example: 'Success'
 *       500:
 *         description: Error interno del servidor al agregar el registro de log
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: 'Add logs error: [error details]'
 */
router.post('/add', logController.add);

module.exports = router;