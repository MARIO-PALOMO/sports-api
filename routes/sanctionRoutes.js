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
 *     tags: [Sanciones]
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
 * /sanctions/getTopFiveSanctionsByType/{sanction_type_id}:
 *   get:
 *     summary: Obtiene los cinco jugadores con más sanciones por tipo de sanción
 *     description: Retorna los cinco jugadores con más sanciones, agrupados por jugador, para un tipo de sanción específico. El resultado incluye el ID del jugador, nombre, número, equipo, cantidad de sanciones y los IDs de los partidos en los que se sancionó al jugador.
 *     tags: [Sanciones]
 *     parameters:
 *       - in: path
 *         name: sanction_type_id
 *         required: true
 *         description: ID del tipo de sanción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de los cinco jugadores con más sanciones por tipo de sanción
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - player_id: "12345"
 *                   player_name: "John Doe"
 *                   player_number: 10
 *                   team_id: "54321"
 *                   team_name: "Team A"
 *                   team_logo: "logo_url"
 *                   sanctions_count: 5
 *                   match_ids: ["match1", "match2", "match3"]
 *                 - player_id: "23456"
 *                   player_name: "Jane Smith"
 *                   player_number: 8
 *                   team_id: "65432"
 *                   team_name: "Team B"
 *                   team_logo: "logo_url"
 *                   sanctions_count: 4
 *                   match_ids: ["match4", "match5"]
 *               message: "Sanciones obtenidas con éxito."
 *       500:
 *         description: Error interno del servidor
 */
router.get('/getTopFiveSanctionsByType/:sanction_type_id', sanctionController.getTopFiveSanctionsByType);

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
 *       200:
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

/**
 * @swagger
 * /sanctions/getSanctionsByTypeAndMatch/{sanction_type_id}/{match_id}:
 *   get:
 *     summary: Obtiene sanciones por tipo y partido
 *     description: Retorna un listado de sanciones agrupadas por jugador, basadas en el tipo de sanción y el ID del partido.
 *     tags: [Sanciones]
 *     parameters:
 *       - in: path
 *         name: sanction_type_id
 *         required: true
 *         description: ID del tipo de sanción
 *         schema:
 *           type: string
 *           example: "d3b07384-d9a3-4f41-b70d-9b81dcaef7c1"
 *       - in: path
 *         name: match_id
 *         required: true
 *         description: ID del partido
 *         schema:
 *           type: string
 *           example: "5d2e1931-8b1a-4f29-8a5c-002fc0c1f785"
 *     responses:
 *       200:
 *         description: Listado de sanciones agrupadas por jugador
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - player_id: "12345"
 *                   player_name: "Juan Pérez"
 *                   player_number: 9
 *                   team_id: "67890"
 *                   team_name: "Equipo A"
 *                   sanctions_count: 2
 *                   match_ids:
 *                     - "abcd1234"
 *                     - "efgh5678"
 *               message: "Sanciones obtenidas con éxito."
 *       500:
 *         description: Error al obtener las sanciones
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               message: "Ocurrió un error al obtener las sanciones. Por favor, inténtelo nuevamente."
 */
router.get('/getSanctionsByTypeAndMatch/:sanction_type_id/:match_id', sanctionController.getSanctionsByTypeAndMatch);

/**
 * @swagger
 * /sanctions/addSanctionsByMatch:
 *   post:
 *     summary: Agregar sanciones a un partido
 *     description: Este endpoint permite agregar una o más sanciones a un partido específico. Cada sanción debe estar asociada a un jugador y a un tipo de sanción válidos.
 *     tags: [Sanciones]
 *     requestBody:
 *       description: Datos necesarios para agregar sanciones a un partido.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               match_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID del partido al que se le van a agregar las sanciones.
 *               sanctions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     player_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID del jugador al que se le aplica la sanción.
 *                     sanction_type_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID del tipo de sanción aplicada.
 *                 example:
 *                   - player_id: "e83b0c26-46b2-4a34-93d1-2b4e4b491c3c"
 *                     sanction_type_id: "fcd2b52f-00b2-4f0d-8c1d-321ab01c94b3"
 *                   - player_id: "b8f78d16-3c5b-4d1e-9b54-1b63f23754d0"
 *                     sanction_type_id: "cc7a1ef9-c3bc-4b30-a34f-33f3f1b44a3c"
 *     responses:
 *       200:
 *         description: Sanciones creadas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "e83b0c26-46b2-4a34-93d1-2b4e4b491c3c"
 *                 message:
 *                   type: string
 *                   example: "Sanciones creadas exitosamente."
 *       500:
 *         description: Ocurrió un error al crear las sanciones del partido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Ocurrió un error al crear las sanciones del partido, [detalle del error]."
 */
router.post('/addSanctionsByMatch', sanctionController.addSanctionsByMatch);

module.exports = router;
