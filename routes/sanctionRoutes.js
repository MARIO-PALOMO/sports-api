const express = require('express');
const router = express.Router();
const sanctionController = require('../controllers/sanction.controller');

/**
 * @swagger
 * tags:
 *   - name: Sanciones
 *     description: Operaciones relacionadas con las sanciones.
 */

/**
 * @swagger
 * /sanctions/getSanctionsByMatch/{match_id}:
 *   get:
 *     tags: [Sanciones]
 *     summary: Obtiene todas las sanciones de un partido específico.
 *     description: Recupera todas las sanciones asociadas a un partido, identificadas por su ID, incluyendo detalles del jugador, el tipo de sanción y el partido.
 *     parameters:
 *       - name: match_id
 *         in: path
 *         required: true
 *         description: ID del partido para el cual se desean obtener las sanciones.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de sanciones asociadas al partido.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   player_id:
 *                     type: string
 *                     format: uuid
 *                   sanction_type_id:
 *                     type: string
 *                     format: uuid
 *                   match_id:
 *                     type: string
 *                     format: uuid
 *                   active:
 *                     type: boolean
 *                   player:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       name:
 *                         type: string
 *                       player_number:
 *                         type: string
 *                   sanctionType:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       name:
 *                         type: string
 *                   match:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       home_team_id:
 *                         type: string
 *                         format: uuid
 *                       away_team_id:
 *                         type: string
 *                         format: uuid
 *       400:
 *         description: Solicitud inválida si el ID del partido no está proporcionado.
 *       404:
 *         description: Partido no encontrado o no hay sanciones para el partido proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/getSanctionsByMatch/:match_id', sanctionController.getSanctionsByMatch);

/**
 * @swagger
 * /sanctions/getSanctionsByType/{sanction_type_id}:
 *   get:
 *     summary: Obtiene sanciones agrupadas por jugador según el tipo de sanción.
 *     description: Este endpoint devuelve un listado de sanciones agrupadas por jugador para un tipo específico de sanción, incluyendo detalles del jugador y del equipo.
 *     tags:  [Sanciones]
 *     parameters:
 *       - in: path
 *         name: sanction_type_id
 *         required: true
 *         description: ID del tipo de sanción.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "d7f4a3ab-094b-4b35-8c8b-1a71a6848d24"
 *     responses:
 *       200:
 *         description: Lista de sanciones agrupadas por jugador obtenida con éxito.
 *         content:
 *           application/json:
 *             example:
 *               data: 
 *                 - player_id: "12d34b56-78c9-0a12-b345-67de890f12ab"
 *                   player_name: "John Doe"
 *                   player_number: 10
 *                   team_id: "23e45f67-89a0-1b23-c456-78d9e0123456"
 *                   team_name: "Team A"
 *                   sanctions_count: 3
 *                   match_ids:
 *                     - "abc12345-def6-7890-gh12-ijklmnopqrst"
 *                     - "uvwx1234-yzab-5678-cdef-ghijklmnopqr"
 *               message: "Sanciones obtenidas con éxito."
 *       400:
 *         description: El ID del tipo de sanción es requerido.
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               message: "El ID del tipo de sanción es requerido."
 *       404:
 *         description: Tipo de sanción no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               message: "Tipo de sanción no encontrado."
 *       500:
 *         description: Error interno del servidor al obtener las sanciones.
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               message: "Ocurrió un error al obtener las sanciones. Por favor, inténtelo nuevamente."
 */
router.get('/getSanctionsByType/:sanction_type_id', sanctionController.getSanctionsByType);

/**
 * @swagger
 * /sanctions/getSanctionsByTypeAndTeam/{sanction_type_id}/{team_id}:
 *   get:
 *     tags: [Sanciones]
 *     summary: Obtiene sanciones por tipo y equipo
 *     description: Obtiene una lista de sanciones agrupadas por jugador, filtradas por el tipo de sanción y el ID del equipo, ordenadas de manera descendente por la cantidad de sanciones.
 *     parameters:
 *       - name: sanction_type_id
 *         in: path
 *         required: true
 *         description: ID del tipo de sanción.
 *         schema:
 *           type: string
 *       - name: team_id
 *         in: path
 *         required: true
 *         description: ID del equipo.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sanciones obtenidas con éxito.
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
 *                       player_id:
 *                         type: string
 *                         example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
 *                       player_name:
 *                         type: string
 *                         example: 'Juan Pérez'
 *                       player_number:
 *                         type: integer
 *                         example: 10
 *                       team_id:
 *                         type: string
 *                         example: 'd30b160c-f59f-4b7e-91d6-65f4e8d5f62a'
 *                       team_name:
 *                         type: string
 *                         example: 'FC Ejemplo'
 *                       sanctions_count:
 *                         type: integer
 *                         example: 3
 *                       match_ids:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ['match1', 'match2', 'match3']
 *                 message:
 *                   type: string
 *                   example: 'Sanciones obtenidas con éxito.'
 *       '400':
 *         description: Error de solicitud, falta de parámetros.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: 'El ID del tipo de sanción es requerido.'
 *       '404':
 *         description: Recurso no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: 'Tipo de sanción no encontrado.'
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: 'Ocurrió un error al obtener las sanciones. Por favor, inténtelo nuevamente.'
 */
router.get('/getSanctionsByTypeAndTeam/:sanction_type_id/:team_id', sanctionController.getSanctionsByTypeAndTeam);

module.exports = router;
