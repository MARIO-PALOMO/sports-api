const express = require("express");
const router = express.Router();
const competitionController = require("../controllers/competition.controller");

/**
 * @swagger
 * tags:
 *   name: Campeonatos
 *   description: Operaciones relacionadas con los campeonatos
 */

/**
 * @swagger
 * /competitions/getAll:
 *   get:
 *     summary: Obtener todas las competencias
 *     tags: [Campeonatos]
 *     responses:
 *       200:
 *         description: Listado de campeonatos obtenidos exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.get('/getAll', competitionController.getAllCompetitions);

/**
 * @swagger
 * /competitions/{id}:
 *   get:
 *     summary: Obtener una competencia por ID
 *     tags: [Campeonatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la competencia
 *     responses:
 *       200:
 *         description: Competencia obtenida exitosamente
 *       404:
 *         description: Competencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', competitionController.getCompetitionById);

/**
 * @swagger
 * /competitions/addCompetition:
 *   post:
 *     summary: Crear una nueva competencia
 *     tags: [Campeonatos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - organizer
 *               - start_date
 *               - end_date
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               organizer:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               logo:
 *                 type: string
 *                 description: Imagen en base64
 *     responses:
 *       200:
 *         description: Competencia creada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/addCompetition', competitionController.addCompetition);

/**
 * @swagger
 * /competitions/{id}/updateCompetitionDetails:
 *   put:
 *     summary: Actualizar detalles de una competencia por ID
 *     tags: [Campeonatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la competencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               organizer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Competencia actualizada exitosamente
 *       404:
 *         description: Competencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id/updateCompetitionDetails', competitionController.updateCompetitionDetails);

/**
 * @swagger
 * /competitions/{id}/updateCompetitionDates:
 *   put:
 *     summary: Actualizar fechas de una competencia por ID
 *     tags: [Campeonatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la competencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Fechas actualizadas exitosamente
 *       404:
 *         description: Competencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id/updateCompetitionDates', competitionController.updateCompetitionDates);

/**
 * @swagger
 * /competitions/{id}/updateCompetitionLogos:
 *   put:
 *     summary: Actualizar logo de una competencia por ID
 *     tags: [Campeonatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la competencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 description: Imagen en base64
 *     responses:
 *       200:
 *         description: Logo actualizado exitosamente
 *       404:
 *         description: Competencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id/updateCompetitionLogos', competitionController.updateCompetitionLogos);

/**
 * @swagger
 * /competitions/{id}/updateCompetitionInfo:
 *   put:
 *     summary: Actualizar una competencia por ID
 *     tags: [Campeonatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la competencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Competencia actualizada exitosamente
 *       404:
 *         description: Competencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id/updateCompetitionInfo', competitionController.updateCompetitionInfo);

module.exports = router;