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
 * /goals/getTopFiveScorers:
 *   get:
 *     summary: Obtiene el top 5 de goleadores de toda la competición
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
 *       500:
 *         description: Error al consultar los goleadores.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al consultar los goleadores"
 *               data: "Detalles del error"
 */
router.get('/getTopFiveScorers', goalController.getTopFiveScorers);

/**
 * @swagger
 * /goals/getGoalsByMatch/{match_id}:
 *   get:
 *     summary: Obtiene la cantidad de goles agrupados por jugador para un partido específico.
 *     description: Recupera la cantidad total de goles por jugador para el partido identificado por match_id.
 *     tags: [Gestión de Goles]
 *     parameters:
 *       - name: match_id
 *         in: path
 *         description: ID del partido para el cual se desea obtener la cantidad de goles por jugador.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de goles agrupados por jugador para el partido especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Goles encontrados para el partido
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       match_id:
 *                         type: string
 *                         example: "match123"
 *                       team_id:
 *                         type: string
 *                         example: "team456"
 *                       team_name:
 *                         type: string
 *                         example: "Team A"
 *                       player_id:
 *                         type: string
 *                         example: "player789"
 *                       player_name:
 *                         type: string
 *                         example: "John Doe"
 *                       player_number:
 *                         type: integer
 *                         example: 10
 *                       goal_count:
 *                         type: integer
 *                         example: 5
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al consultar los goles por partido
 *                 data:
 *                   type: string
 *                   example: Descripción del error
 */
router.get('/getGoalsByMatch/:match_id', goalController.getGoalsByMatch);

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
