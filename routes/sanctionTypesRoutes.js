const express = require("express");
const router = express.Router();
const santionTypeController = require("../controllers/sanction_type.controller");

/**
 * @swagger
 * tags:
 *   name: Tipo de Sanciones
 *   description: Operaciones relacionadas con los tipos de sanciones
 */

/**
 * @swagger
 * /sanctiontypes/getAll:
 *   get:
 *     summary: Obtener todos los tipos de sanciones
 *     tags: [Tipo de Sanciones]
 *     responses:
 *       200:
 *         description: Tipos de sanciones encontradas
 *         content:
 *           application/json:
 *             example:
 *               message: Tipos de sanciones encontradas
 *               data: [{ "id": "uuid", "name": "Amarilla", "description": "Tarjeta amarilla", "active": true, "createdAt": "2023-08-22T10:11:12.000Z", "updatedAt": "2023-08-22T10:11:12.000Z" }]
 *       500:
 *         description: Error al obtener los tipos de sanciones
 *         content:
 *           application/json:
 *             example:
 *               message: Error al obtener los tipos de sanciones
 *               data: null
 */
router.get('/getAll', santionTypeController.getAllSanctionTypes);

/**
 * @swagger
 * /sanctiontypes/{id}:
 *   get:
 *     summary: Obtener un tipo de sanción por ID
 *     tags: [Tipo de Sanciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de sanción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tipo de sanción encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Tipo de sanción encontrado
 *               data: { "id": "uuid", "name": "Amarilla", "description": "Tarjeta amarilla", "active": true, "createdAt": "2023-08-22T10:11:12.000Z", "updatedAt": "2023-08-22T10:11:12.000Z" }
 *       404:
 *         description: Tipo de sanción no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Tipo de sanción no encontrado
 *               data: null
 *       500:
 *         description: Error al obtener el tipo de sanción
 *         content:
 *           application/json:
 *             example:
 *               message: Error al obtener el tipo de sanción por ID
 *               data: null
 */
router.get('/:id', santionTypeController.getSanctionTypeById);

/**
 * @swagger
 * /sanctiontypes/addSanctionType:
 *   post:
 *     summary: Crear un nuevo tipo de sanción
 *     tags: [Tipo de Sanciones]
 *     requestBody:
 *       description: Datos del nuevo tipo de sanción
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Roja
 *             description: Tarjeta roja
 *             active: true
 *     responses:
 *       200:
 *         description: Tipo de sanción creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Tipo de sanción creado exitosamente
 *               data: { "id": "uuid", "name": "Roja", "description": "Tarjeta roja", "active": true, "createdAt": "2023-08-22T10:11:12.000Z", "updatedAt": "2023-08-22T10:11:12.000Z" }
 *       500:
 *         description: Error al crear el tipo de sanción
 *         content:
 *           application/json:
 *             example:
 *               message: Error al crear el tipo de sanción
 *               data: null
 */
router.post('/addSanctionType', santionTypeController.addSanctionType);

/**
 * @swagger
 * /sanctiontypes/addMultipleSanctionTypes:
 *   post:
 *     summary: Crear múltiples tipos de sanciones
 *     tags: [Tipo de Sanciones]
 *     requestBody:
 *       description: Datos de los tipos de sanciones a crear
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             sanctionTypes:
 *               - name: Roja
 *                 description: Tarjeta roja
 *                 active: true
 *               - name: Amarilla
 *                 description: Tarjeta amarilla
 *                 active: true
 *     responses:
 *       200:
 *         description: Múltiples tipos de sanción creados exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Múltiples tipos de sanción creados exitosamente
 *               data: 
 *                 - { "id": "uuid", "name": "Roja", "description": "Tarjeta roja", "active": true, "createdAt": "2023-08-22T10:11:12.000Z", "updatedAt": "2023-08-22T10:11:12.000Z" }
 *                 - { "id": "uuid", "name": "Amarilla", "description": "Tarjeta amarilla", "active": true, "createdAt": "2023-08-22T10:11:12.000Z", "updatedAt": "2023-08-22T10:11:12.000Z" }
 *       500:
 *         description: Error al crear múltiples tipos de sanción
 *         content:
 *           application/json:
 *             example:
 *               message: Error al crear múltiples tipos de sanción
 *               data: null
 */
router.post('/addMultipleSanctionTypes', santionTypeController.addMultipleSanctionTypes);

module.exports = router;