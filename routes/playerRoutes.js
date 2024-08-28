const express = require("express");
const router = express.Router();
const playerController = require("../controllers/player.controller");

/**
 * @swagger
 * tags:
 *   name: Jugadores
 *   description: API para gestionar jugadores
 */

/**
 * @swagger
 * /players/getAll:
 *   get:
 *     summary: Obtener todos los jugadores
 *     tags: [Jugadores]
 *     responses:
 *       200:
 *         description: Lista de jugadores encontrados
 *         content:
 *           application/json:
 *             example:
 *               message: Lista de jugadores encontrados
 *               data:
 *                 - id: "e7b8d7b7-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                   name: "John Doe"
 *                   document_number: "1234567890"
 *                   birthdate: "1990-01-01"
 *                   player_number: "10"
 *                   team_id: "b9b8d8b8-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                   photo: "base64string"
 *       500:
 *         description: Error al consultar jugadores
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               error: "Error al consultar jugadores"
 */
router.get('/getAll', playerController.getAllPlayers);

/**
 * @swagger
 * /players/{teamId}/getAllPlayersByTeamId:
 *   get:
 *     summary: Obtiene todos los jugadores de un equipo específico
 *     description: Retorna una lista de todos los jugadores que pertenecen a un equipo específico, identificado por su ID.
 *     tags:
 *       - Jugadores
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         description: El ID del equipo para el cual se desean consultar los jugadores.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de jugadores encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Jugadores encontrados
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
 *                       document_number:
 *                         type: string
 *                         nullable: true
 *                       birthdate:
 *                         type: string
 *                         format: date
 *                         nullable: true
 *                       player_number:
 *                         type: string
 *                       active:
 *                         type: boolean
 *                       team:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
 *                           logo:
 *                             type: string
 *                             format: base64
 *       404:
 *         description: No se encontraron jugadores para este equipo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se encontraron jugadores para este equipo
 *                 data:
 *                   type: null
 *                   example: null
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: "Error al consultar jugadores por equipo."
 */
router.get('/:teamId/getAllPlayersByTeamId', playerController.getAllPlayersByTeamId);

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Obtener un jugador por ID
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jugador encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Jugador encontrado
 *               data:
 *                 id: "e7b8d7b7-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                 name: "John Doe"
 *                 document_number: "1234567890"
 *                 birthdate: "1990-01-01"
 *                 player_number: "10"
 *                 team_id: "b9b8d8b8-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                 photo: "base64string"
 *       404:
 *         description: Jugador no encontrado
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               message: "Jugador no encontrado"
 *       500:
 *         description: Error al consultar jugador
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               error: "Error al consultar jugador"
 */
router.get('/:id', playerController.getPlayerById);

/**
 * @swagger
 * /players/addPlayer:
 *   post:
 *     summary: Crear un nuevo jugador
 *     tags: [Jugadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "John Doe"
 *             document_number: "1234567890"
 *             birthdate: "1990-01-01"
 *             player_number: "10"
 *             team_name: "Team A"
 *     responses:
 *       200:
 *         description: Jugador creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Jugador creado exitosamente
 *               data:
 *                 id: "e7b8d7b7-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                 name: "John Doe"
 *                 document_number: "1234567890"
 *                 birthdate: "1990-01-01"
 *                 player_number: "10"
 *                 team_id: "b9b8d8b8-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                 photo: "base64string"
 *       400:
 *         description: Error al crear jugador
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               error: "Error al crear jugador"
 *       404:
 *         description: Equipo no encontrado
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               error: "Equipo no encontrado."
 */
router.post('/addPlayer', playerController.addPlayer);

/**
 * @swagger
 * /players/addMultiplePlayers:
 *   post:
 *     summary: Crear varios jugadores a la vez
 *     tags: [Jugadores]
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
 *                   example: "John Doe"
 *                 document_number:
 *                   type: string
 *                   example: "1234567890"
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                   example: "1990-01-01"
 *                 player_number:
 *                   type: string
 *                   example: "10"
 *                 team_name:
 *                   type: string
 *                   example: "Team A"
 *     responses:
 *       200:
 *         description: Jugadores creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Jugadores creados exitosamente"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "e7b8d7b7-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       document_number:
 *                         type: string
 *                         example: "1234567890"
 *                       birthdate:
 *                         type: string
 *                         format: date
 *                         example: "1990-01-01"
 *                       player_number:
 *                         type: string
 *                         example: "10"
 *                       team_id:
 *                         type: string
 *                         format: uuid
 *                         example: "b9b8d8b8-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                       photo:
 *                         type: string
 *                         example: "base64string"
 *       400:
 *         description: Error al crear jugadores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: 'null'
 *                 error:
 *                   type: string
 *                   example: "Error al crear jugador: Equipo no encontrado: Team X"
 *       500:
 *         description: Error al cargar la foto predeterminada o error interno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: 'null'
 *                 error:
 *                   type: string
 *                   example: "Error al cargar la foto predeterminada."
 */
router.post('/addMultiplePlayers', playerController.addMultiplePlayers);

/**
 * @swagger
 * /players/{id}/updatePlayer:
 *   put:
 *     summary: Actualizar los datos de un jugador
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "John Doe"
 *             document_number: "1234567890"
 *             birthdate: "1990-01-01"
 *             player_number: "10"
 *             team_name: "Team A"
 *     responses:
 *       200:
 *         description: Jugador actualizado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Jugador actualizado exitosamente
 *               data:
 *                 id: "e7b8d7b7-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                 name: "John Doe"
 *                 document_number: "1234567890"
 *                 birthdate: "1990-01-01"
 *                 player_number: "10"
 *                 team_id: "b9b8d8b8-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                 photo: "base64string"
 *       400:
 *         description: Error al actualizar jugador
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               error: "Error al actualizar jugador"
 *       404:
 *         description: Jugador no encontrado
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               message: "Jugador no encontrado"
 *       500:
 *         description: Error al cargar la foto predeterminada
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               error: "Error al cargar la foto predeterminada."
 */
router.put('/:id/updatePlayer', playerController.updatePlayer);

/**
 * @swagger
 * /players/{id}/updatePlayerPhoto:
 *   put:
 *     summary: Actualizar la foto de un jugador
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             photo: "base64string"
 *     responses:
 *       200:
 *         description: Foto del jugador actualizada exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Foto del jugador actualizada exitosamente
 *               data:
 *                 id: "e7b8d7b7-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                 name: "John Doe"
 *                 document_number: "1234567890"
 *                 birthdate: "1990-01-01"
 *                 player_number: "10"
 *                 team_id: "b9b8d8b8-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                 photo: "base64string"
 *       400:
 *         description: Error al actualizar la foto del jugador
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               error: "Error al actualizar la foto del jugador"
 *       404:
 *         description: Jugador no encontrado
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               message: "Jugador no encontrado"
 */
router.put('/:id/updatePlayerPhoto', playerController.updatePlayerPhoto);

/**
 * @swagger
 * /players/{id}/deletePlayer:
 *   delete:
 *     summary: Eliminar un jugador por ID
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jugador eliminado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Jugador eliminado exitosamente
 *       400:
 *         description: Error al eliminar jugador
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               error: "Error al eliminar jugador"
 *       404:
 *         description: Jugador no encontrado
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               message: "Jugador no encontrado"
 */
router.delete('/:id/deletePlayer', playerController.deletePlayer);

/**
 * @swagger
 * /players/deleteMultiplePlayers:
 *   delete:
 *     summary: Eliminar varios jugadores a la vez
 *     tags: [Jugadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             ids:
 *               - "e7b8d7b7-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *               - "c8c8d8c8-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *     responses:
 *       200:
 *         description: Jugadores eliminados exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Jugadores eliminados exitosamente
 *       400:
 *         description: Error al eliminar jugadores
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               error: "Error al eliminar jugadores"
 *       404:
 *         description: Jugador(es) no encontrado(s)
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               message: "Jugador(es) no encontrado(s)"
 */
router.delete('/deleteMultiplePlayers', playerController.deleteMultiplePlayers);

module.exports = router;