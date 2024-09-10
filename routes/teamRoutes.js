const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");

/**
 * @swagger
 * tags:
 *   - name: Equipos
 *     description: Operaciones relacionadas con equipos de fútbol.
 */

/**
 * @swagger
 * /teams/getAll:
 *   get:
 *     tags:
 *       - Equipos
 *     summary: Obtener todos los equipos
 *     description: Retorna una lista de todos los equipos registrados.
 *     responses:
 *       200:
 *         description: Lista de equipos obtenida con éxito.
 *       500:
 *         description: Error al consultar los equipos.
 */
router.get('/getAll', teamController.getAll);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     tags:
 *       - Equipos
 *     summary: Obtener un equipo por ID
 *     description: Retorna los detalles de un equipo específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del equipo que se desea consultar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Equipo encontrado exitosamente.
 *       500:
 *         description: Error al consultar el equipo.
 */
router.get('/:id', teamController.getTeamById);

/**
 * @swagger
 * /teams/addTeam:
 *   post:
 *     tags:
 *       - Equipos
 *     summary: Crear un nuevo equipo
 *     description: Crea un equipo nuevo en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Equipo A"
 *             coach: "Entrenador A"
 *     responses:
 *       200:
 *         description: Equipo creado exitosamente.
 *       500:
 *         description: Error al crear el equipo.
 */
router.post('/addTeam', teamController.addTeam);

/**
 * @swagger
 * /teams/addMultipleTeams:
 *   post:
 *     tags:
 *       - Equipos
 *     summary: Crear múltiples equipos
 *     description: Crea múltiples equipos en la base de datos en una sola solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             - name: "Equipo A"
 *               coach: "Entrenador A"
 *             - name: "Equipo B"
 *               coach: "Entrenador B"
 *     responses:
 *       200:
 *         description: Equipos creados exitosamente.
 *       500:
 *         description: Error al crear los equipos.
 */
router.post('/addMultipleTeams', teamController.addMultipleTeams);

/**
 * @swagger
 * /teams/addMultipleTeamsLogo:
 *   post:
 *     tags:
 *       - Equipos
 *     summary: Crear múltiples equipos con logos en base64
 *     description: Crea múltiples equipos a partir de una lista de objetos de equipo. Cada equipo debe incluir un logo en formato base64.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del equipo
 *                   example: "Equipo A"
 *                 coach:
 *                   type: string
 *                   description: Nombre del entrenador
 *                   example: "Juan Pérez"
 *                 logo:
 *                   type: string
 *                   description: Logo del equipo en formato base64
 *                   example: "iVBORw0KGgoAAAANSUhEUgAA..."
 *     responses:
 *       200:
 *         description: Equipos creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Equipos creados exitosamente"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "e1e0e9d3-657c-4a91-b5a2-f91c03e8b5b8"
 *                       name:
 *                         type: string
 *                         example: "Equipo A"
 *                       coach:
 *                         type: string
 *                         example: "Juan Pérez"
 *                       logo:
 *                         type: string
 *                         example: "iVBORw0KGgoAAAANSUhEUgAA..."
 *       '500':
 *         description: Error interno del servidor al crear los equipos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al crear equipos: <error_message>"
 */
router.post('/addMultipleTeamsLogo', teamController.addMultipleTeamsLogo);

/**
 * @swagger
 * /teams/{id}/updateTeamDetails:
 *   put:
 *     tags:
 *       - Equipos
 *     summary: Actualizar detalles del equipo por ID
 *     description: Actualiza el nombre y el entrenador de un equipo específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del equipo que se desea actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Nuevo Nombre"
 *             coach: "Nuevo Entrenador"
 *     responses:
 *       200:
 *         description: Detalles del equipo actualizados exitosamente.
 *       500:
 *         description: Error al actualizar los detalles del equipo.
 */
router.put('/:id/updateTeamDetails', teamController.updateTeamDetails);

/**
 * @swagger
 * /teams/{id}/updateTeamLogo:
 *   put:
 *     tags:
 *       - Equipos
 *     summary: Actualizar el logo del equipo por ID
 *     description: Actualiza el logo de un equipo específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del equipo que se desea actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             logo: "base64string"
 *     responses:
 *       200:
 *         description: Logo del equipo actualizado exitosamente.
 *       500:
 *         description: Error al actualizar el logo del equipo.
 */
router.put('/:id/updateTeamLogo', teamController.updateTeamLogo);

/**
 * @swagger
 * /teams/{id}/updateTeamInfo:
 *   put:
 *     tags:
 *       - Equipos
 *     summary: Actualizar un equipo por ID
 *     description: Actualiza los detalles de un equipo específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del equipo que se desea actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Nuevo Nombre"
 *             coach: "Nuevo Entrenador"
 *             logo: "Nuevo Logo"
 *     responses:
 *       200:
 *         description: Equipo actualizado exitosamente.
 *       500:
 *         description: Error al actualizar el equipo.
 */
router.put('/:id/updateTeamInfo', teamController.updateTeamInfo);

/**
 * @swagger
 * /teams/{id}/deleteTeam:
 *   delete:
 *     tags:
 *       - Equipos
 *     summary: Eliminar un equipo por ID
 *     description: Elimina un equipo específico de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del equipo que se desea eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Equipo eliminado exitosamente.
 *       500:
 *         description: Error al eliminar el equipo.
 */
router.delete('/:id/deleteTeam', teamController.deleteTeam);

module.exports = router;