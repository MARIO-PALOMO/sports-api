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
 *       201:
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
router.post('/goals/addGoals', goalController.addGoals);

module.exports = router;
