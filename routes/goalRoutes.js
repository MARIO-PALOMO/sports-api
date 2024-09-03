const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goal.controller');

/**
 * @swagger
 * tags:
 *   name: Gestión de Goles
 *   description: Operaciones relacionadas con los campeonatos
 */

/**
 * @swagger
 * /goals/getGoalsByMatch/{match_id}:
 *   get:
 *     summary: Obtiene todos los goles de un partido específico
 *     description: Devuelve todos los registros de goles de un partido en particular, incluyendo la información del partido y del jugador asociado a cada gol.
 *     tags: [Gestión de Goles]
 *     parameters:
 *       - in: path
 *         name: match_id
 *         required: true
 *         description: El ID del partido del cual se quieren obtener los goles.
 *         schema:
 *           type: string
 *           example: "cb0f4877-d7d7-4a72-a4d4-a99fd5d8eac8"
 *     responses:
 *       200:
 *         description: Lista de goles encontrados para el partido.
 *         content:
 *           application/json:
 *             example:
 *               message: "Goles encontrados"
 *               data:
 *                 - id: "1c920b6b-e8f8-4e25-b92e-bc2d8b74f539"
 *                   match_id: "cb0f4877-d7d7-4a72-a4d4-a99fd5d8eac8"
 *                   player_id: "60e314d4-c247-4318-b65d-8a185342c838"
 *                   match:
 *                     id: "cb0f4877-d7d7-4a72-a4d4-a99fd5d8eac8"
 *                     name: "Final Match"
 *                   player:
 *                     id: "60e314d4-c247-4318-b65d-8a185342c838"
 *                     name: "Player One"
 *       400:
 *         description: Error de validación, el `match_id` no está presente en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               message: "El match_id es requerido"
 *               data: null
 *       404:
 *         description: No se encontraron goles para el partido especificado.
 *         content:
 *           application/json:
 *             example:
 *               message: "No se encontraron goles para este partido"
 *               data: null
 *       500:
 *         description: Error al consultar los goles del partido.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al consultar los goles del partido"
 *               data: "Error message here"
 */
router.get('/getGoalsByMatch/:match_id', goalController.getGoalsByMatch);

/**
 * @swagger
 * /goals/getTopScorers:
 *   get:
 *     summary: Obtiene un listado de goleadores
 *     description: Retorna un listado de los jugadores que han anotado goles, incluyendo la información del equipo y la cantidad de goles anotados por cada jugador.
 *     tags: [Gestión de Goles]
 *     responses:
 *       200:
 *         description: Listado de goleadores encontrado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               message: "Goleadores encontrados"
 *               data:
 *                 - team_id: "e7c97f5a-9cb9-4a63-8f6d-5c96c867fc7d"
 *                   team_name: "Equipo A"
 *                   player_id: "7b5b7b7a-2c3d-4d5c-b7d3-7c3e3d7d3e3d"
 *                   player_name: "Jugador 1"
 *                   player_number: "10"
 *                   goal_count: 5
 *                 - team_id: "f8a97f6b-7db9-4b73-9f7e-6d86f867dc7d"
 *                   team_name: "Equipo B"
 *                   player_id: "8d6d7c8a-3c4e-4d6f-b8e4-8c4f4d8e4c4f"
 *                   player_name: "Jugador 2"
 *                   player_number: "7"
 *                   goal_count: 3
 *       404:
 *         description: No se encontraron goleadores.
 *         content:
 *           application/json:
 *             example:
 *               message: "No se encontraron goleadores"
 *               data: null
 *       500:
 *         description: Error al consultar los goleadores.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al consultar los goleadores"
 *               data: "Detalles del error"
 */
router.get('/getTopScorers', goalController.getTopScorers);

/**
 * @swagger
 * /goals/getTopScorersByTeam/{team_id}:
 *   get:
 *     summary: Obtiene los máximos goleadores para un equipo específico
 *     description: Devuelve una lista de los jugadores con más goles de un equipo dado.
 *     tags: [Gestión de Goles]
 *     parameters:
 *       - in: path
 *         name: team_id
 *         required: true
 *         description: ID del equipo
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de goleadores del equipo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Goleadores encontrados para el equipo
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       team_id:
 *                         type: string
 *                         format: uuid
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       team_name:
 *                         type: string
 *                         example: "Team A"
 *                       player_id:
 *                         type: string
 *                         format: uuid
 *                         example: "123e4567-e89b-12d3-a456-426614174001"
 *                       player_name:
 *                         type: string
 *                         example: "John Doe"
 *                       player_number:
 *                         type: integer
 *                         example: 10
 *                       goal_count:
 *                         type: integer
 *                         example: 15
 *       404:
 *         description: No se encontraron goleadores para este equipo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se encontraron goleadores para este equipo
 *                 data:
 *                   type: null
 *       500:
 *         description: Error al consultar los goleadores por equipo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al consultar los goleadores por equipo
 *                 data:
 *                   type: string
 *                   example: "Error details"
 */
router.get('/getTopScorersByTeam/:team_id', goalController.getTopScorersByTeam);

/**
 * @swagger
 * /goals/addGoals:
 *   post:
 *     tags: [Gestión de Goles]
 *     summary: Agregar goles a un partido
 *     description: Agrega uno o más goles a un partido específico. Se debe proporcionar el ID del partido y un array con los IDs de los jugadores que hicieron los goles.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           examples:
 *             ejemplo1:
 *               summary: Ejemplo de solicitud para agregar goles
 *               value:
 *                 match_id: "UUID-del-partido"
 *                 player_ids: ["UUID-jugador1", "UUID-jugador2"]
 *     responses:
 *       200:
 *         description: Goles agregados exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Goles agregados exitosamente
 *               data:
 *                 - id: "UUID-del-gol1"
 *                   match_id: "UUID-del-partido"
 *                   player_id: "UUID-jugador1"
 *                 - id: "UUID-del-gol2"
 *                   match_id: "UUID-del-partido"
 *                   player_id: "UUID-jugador2"
 *       400:
 *         description: Error de validación en los datos proporcionados
 *         content:
 *           application/json:
 *             example:
 *               message: El match_id y un array con al menos un player_id son requeridos
 *               data: null
 *       404:
 *         description: Partido no encontrado o jugadores no pertenecen a los equipos del partido
 *         content:
 *           application/json:
 *             example:
 *               message: Partido no encontrado
 *               data: null
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               message: Error al agregar los goles
 *               data: "Mensaje de error detallado"
 */
router.post('/addGoals', goalController.addGoals);

module.exports = router;
