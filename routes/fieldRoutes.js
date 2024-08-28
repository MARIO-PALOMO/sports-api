const express = require("express");
const router = express.Router();
const fieldController = require("../controllers/field.controller");

/**
 * @swagger
 * tags:
 *   - name: Canchas Deportivas
 *     description: Operaciones relacionadas con las canchas deportivas
 */

/**
 * @swagger
 * /fields/getAll:
 *   get:
 *     summary: Obtener todas las canchas deportivas
 *     description: Retorna una lista de todas las canchas deportivas registradas.
 *     tags: 
 *       - Canchas Deportivas
 *     responses:
 *       200:
 *         description: Canchas deportivas encontradas
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
 *                       name:
 *                         type: string
 *                       location:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Error al consultar las canchas deportivas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.get('/getAll', fieldController.getAll);

/**
 * @swagger
 * /field/{id}:
 *   get:
 *     summary: Obtener una cancha deportiva por ID
 *     description: Retorna un registro de cancha deportiva basado en el ID proporcionado.
 *     tags:
 *       - Canchas Deportivas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cancha deportiva
 *     responses:
 *       200:
 *         description: Cancha deportiva encontrada
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
 *                     name:
 *                       type: string
 *                     location:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Cancha deportiva no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       500:
 *         description: Error al consultar cancha deportiva por ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.get('/:id', fieldController.getFieldById);

/**
 * @swagger
 * /fields/addField:
 *   post:
 *     summary: Crear una nueva cancha deportiva
 *     description: Crea y retorna un nuevo registro de cancha deportiva.
 *     tags:
 *       - Canchas Deportivas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cancha deportiva creada con éxito
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
 *                     name:
 *                       type: string
 *                     location:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: Error al crear cancha deportiva
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.post('/addField', fieldController.addField);

/**
 * @swagger
 * /fields/addMultipleFields:
 *   post:
 *     summary: Crear múltiples canchas deportivas
 *     description: Crea múltiples registros de canchas deportivas y los retorna.
 *     tags:
 *       - Canchas Deportivas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fields:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     location:
 *                       type: string
 *     responses:
 *       200:
 *         description: Canchas deportivas creadas con éxito
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
 *                       name:
 *                         type: string
 *                       location:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: El campo fields debe ser un array y no estar vacío.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       500:
 *         description: Error al agregar múltiples canchas deportivas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.post('/addMultipleFields', fieldController.addMultipleFields);

module.exports = router;