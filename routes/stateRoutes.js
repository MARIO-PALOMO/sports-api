const express = require("express");
const router = express.Router();
const stateController = require("../controllers/state.controller");

/**
 * @swagger
 * tags:
 *   name: Estados de Juego
 *   description: API para la gestión de estados
 */

/**
 * @swagger
 * /states/getAll:
 *   get:
 *     summary: Obtiene todos los registros de states.
 *     tags: [Estados de Juego]
 *     responses:
 *       200:
 *         description: Lista de todos los registros de states.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ""
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         description: El ID del states.
 *                       name:
 *                         type: string
 *                         description: El nombre del states.
 *       500:
 *         description: Error al consultar states.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Error al consultar states: [detalle del error]"
 */
router.get('/getAll', stateController.getAll);

/**
 * @swagger
 * /states/{id}:
 *   get:
 *     summary: Consultar un registro de State por ID
 *     tags: [Estados de Juego]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del State a consultar
 *     responses:
 *       200:
 *         description: State encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *       404:
 *         description: State no encontrado
 *       500:
 *         description: Error al consultar states
 */
router.get('/:id', stateController.getStateById);

/**
 * @swagger
 * /states/addState:
 *   post:
 *     summary: Agregar un nuevo State
 *     tags: [Estados de Juego]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del State
 *     responses:
 *       200:
 *         description: State creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *       500:
 *         description: Error al crear states
 */
router.post('/addState', stateController.addState);

/**
 * @swagger
 * /states/addMultipleStates:
 *   post:
 *     summary: Agregar múltiples registros de State
 *     tags: [Estados de Juego]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - states
 *             properties:
 *               states:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nombre del State
 *     responses:
 *       200:
 *         description: States creados con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       name:
 *                         type: string
 *       500:
 *         description: Error al crear states
 */
router.post('/addMultipleStates', stateController.addMultipleStates);

module.exports = router;