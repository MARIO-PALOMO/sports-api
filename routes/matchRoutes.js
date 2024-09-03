const express = require("express");
const router = express.Router();
const matchController = require("../controllers/match.controller");

/**
 * @swagger
 * tags:
 *   name: Partidos
 *   description: Operaciones relacionadas con los partidos.
 */

/**
 * @swagger
 * /matches/getAll:
 *   get:
 *     summary: Obtener el listado de todos los partidos
 *     description: Recupera todos los partidos junto con la información relacionada de competiciones, rondas, equipos, estados, horarios y resultados. Excluye los campos `createdAt` y `updatedAt` y ordena los partidos por `match_date` en forma ascendente.
 *     tags: [Partidos]
 *     responses:
 *       200:
 *         description: Listado de todos los partidos exitosamente recuperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Listado de todos los partidos'
 *                 data:
 *                   type: array
 *                   items:
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
 *                       competition_id:
 *                         type: string
 *                         format: uuid
 *                       round_id:
 *                         type: string
 *                         format: uuid
 *                       match_date:
 *                         type: string
 *                         format: date-time
 *                       start_time:
 *                         type: string
 *                         format: time
 *                       competition:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                       round:
 *                         type: object
 *                       homeTeam:
 *                         type: object
 *                       awayTeam:
 *                         type: object
 *                       state:
 *                         type: object
 *                       schedule:
 *                         type: object
 *                         properties:
 *                           field:
 *                             type: object
 *                       result:
 *                         type: object
 *       500:
 *         description: Error al consultar todos los partidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Error al consultar todos los partidos'
 *                 data:
 *                   type: string
 *                   example: 'Error de detalle aquí'
 */
router.get('/getAll', matchController.getAllMatches);

/**
 * @swagger
 * /matches/getMatchesByRound/{code}:
 *   get:
 *     summary: Obtiene el listado de partidos de una ronda específica.
 *     description: Recupera todos los partidos que pertenecen a la ronda identificada por el código proporcionado.
 *     tags: [Partidos]
 *     parameters:
 *       - name: code
 *         in: path
 *         description: Código de la ronda para filtrar los partidos.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Listado de partidos de la ronda.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Listado de partidos de la ronda
 *                 data:
 *                   type: array
 *                   items:
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
 *                       competition_id:
 *                         type: string
 *                         format: uuid
 *                       round_id:
 *                         type: string
 *                         format: uuid
 *                       match_date:
 *                         type: string
 *                         format: date-time
 *                       competition:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                       round:
 *                         type: object
 *                       homeTeam:
 *                         type: object
 *                       awayTeam:
 *                         type: object
 *                       schedules:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               format: uuid
 *                             field:
 *                               type: object
 *                             state:
 *                               type: object
 *                       result:
 *                         type: object
 *       '404':
 *         description: Ronda no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ronda no encontrada
 *                 data:
 *                   type: null
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al consultar los partidos de la ronda
 *                 data:
 *                   type: string
 */
router.get('/getMatchesByRound/:code', matchController.getMatchesByRound);

/**
 * @swagger
 * /matches/{id}:
 *   get:
 *     summary: Obtener un partido por ID
 *     description: Obtiene los detalles de un partido específico basado en el ID proporcionado.
 *     tags: [Partidos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del partido que se desea obtener.
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       '200':
 *         description: Partido encontrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Partido encontrado
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     match_date:
 *                       type: string
 *                       format: date-time
 *                       example: '2024-08-24T15:00:00Z'
 *                     round_id:
 *                       type: string
 *                       example: 123e4567-e89b-12d3-a456-426614174001
 *                     homeTeam:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 123e4567-e89b-12d3-a456-426614174002
 *                         name:
 *                           type: string
 *                           example: Equipo Local
 *                     awayTeam:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 123e4567-e89b-12d3-a456-426614174003
 *                         name:
 *                           type: string
 *                           example: Equipo Visitante
 *                     competition:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Campeonato Nacional
 *                     round:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 123e4567-e89b-12d3-a456-426614174004
 *                         code:
 *                           type: string
 *                           example: RND001
 *                     schedules:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: 123e4567-e89b-12d3-a456-426614174005
 *                           field:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: 123e4567-e89b-12d3-a456-426614174006
 *                               name:
 *                                 type: string
 *                                 example: Estadio Principal
 *                           state:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: 123e4567-e89b-12d3-a456-426614174007
 *                               name:
 *                                 type: string
 *                                 example: Programado
 *                     result:
 *                       type: object
 *                       properties:
 *                         home_score:
 *                           type: integer
 *                           example: 2
 *                         away_score:
 *                           type: integer
 *                           example: 1
 *       '404':
 *         description: Partido no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Partido no encontrado
 *                 data:
 *                   type: null
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al consultar el partido por ID
 *                 data:
 *                   type: string
 *                   example: Detalle del error
 */
router.get('/:id', matchController.getMatchById);

/**
 * @swagger
 * /matches/addMatch:
 *   post:
 *     summary: Crear un partido con sus relaciones y registrar en schedules y results.
 *     tags: [Partidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               home_team_id:
 *                 type: string
 *                 description: ID del equipo local.
 *                 example: 9b8cb2b3-9b8c-4b9b-a9c3-b8c3b8c3b8c3
 *               away_team_id:
 *                 type: string
 *                 description: ID del equipo visitante.
 *                 example: 4e8cd5a1-6d8f-4f9c-b1b2-c8d7e1c2d3e4
 *               competition_id:
 *                 type: string
 *                 description: ID de la competición.
 *                 example: 9b8cb2b3-9b8c-4b9b-a9c3-b8c3b8c3b8c3
 *               roundCode:
 *                 type: string
 *                 description: Código de la ronda.
 *                 example: ED64
 *               match_date:
 *                 type: string
 *                 format: date
 *                 description: Fecha del partido en formato YYYY-MM-DD.
 *                 example: 2024-08-31
 *               start_time:
 *                 type: string
 *                 format: time
 *                 description: Hora del partido en formato HH:mm.
 *                 example: 12:30
 *               field_name:
 *                 type: string
 *                 description: Nombre del campo para el registro de schedules.
 *                 example: Campo A
 *     responses:
 *       200:
 *         description: Partido creado exitosamente y registros de schedules y results añadidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Partido agregado exitosamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     match:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: f9cdb2b1-d5e1-4e78-a07a-68234805c5f7
 *                         home_team_id:
 *                           type: string
 *                           example: 9b8cb2b3-9b8c-4b9b-a9c3-b8c3b8c3b8c3
 *                         away_team_id:
 *                           type: string
 *                           example: 4e8cd5a1-6d8f-4f9c-b1b2-c8d7e1c2d3e4
 *                         competition_id:
 *                           type: string
 *                           example: 9b8cb2b3-9b8c-4b9b-a9c3-b8c3b8c3b8c3
 *                         round_id:
 *                           type: string
 *                           example: 6d8f4e8c-5a6b-4c7d-9e8b-1f2a3c4d5e6f
 *                         match_date:
 *                           type: string
 *                           format: date
 *                           example: 2024-08-31
 *                     schedule:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: b8d5d6e7-f8c9-4a1b-9c0d-1e2f3g4h5i6j
 *                         match_id:
 *                           type: string
 *                           example: f9cdb2b1-d5e1-4e78-a07a-68234805c5f7
 *                         field_name:
 *                           type: string
 *                           example: Campo A
 *                         state_id:
 *                           type: string
 *                           example: 5e7d9f2a-7b2e-4d5c-8d6e-3f1a9b8c7d9e
 *                         start_time:
 *                           type: string
 *                           format: time
 *                           example: 12:30
 *                     result:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p
 *                         match_id:
 *                           type: string
 *                           example: f9cdb2b1-d5e1-4e78-a07a-68234805c5f7
 *                         home_team_score:
 *                           type: integer
 *                           example: 0
 *                         away_team_score:
 *                           type: integer
 *                           example: 0
 *                         home_global_score:
 *                           type: integer
 *                           example: 0
 *                         away_global_score:
 *                           type: integer
 *                           example: 0
 *       400:
 *         description: Solicitud incorrecta debido a datos faltantes o inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Todos los campos son requeridos
 *                 data:
 *                   type: null
 *       500:
 *         description: Error interno del servidor al procesar la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear partido
 *                 data:
 *                   type: string
 *                   example: Mensaje de error detallado
 */
router.post('/addMatch', matchController.addMatch);

/**
 * @swagger
 * /matches/addMultipleMatches:
 *   post:
 *     summary: Crear varios partidos a la vez
 *     description: Permite crear varios partidos en la base de datos en una sola solicitud. Los partidos se crean con sus relaciones adecuadas y se manejan dentro de una transacción para asegurar la consistencia.
 *     tags: [Partidos]
 *     requestBody:
 *       description: Lista de partidos a crear. Cada partido debe incluir información completa y válida.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matches:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     home_team_id:
 *                       type: integer
 *                       description: ID del equipo local.
 *                       example: 1
 *                     away_team_id:
 *                       type: integer
 *                       description: ID del equipo visitante.
 *                       example: 2
 *                     competition_id:
 *                       type: integer
 *                       description: ID de la competición en la que se juega el partido.
 *                       example: 3
 *                     roundCode:
 *                       type: string
 *                       description: Código de la ronda en la que se juega el partido.
 *                       example: "R1"
 *                     match_date:
 *                       type: string
 *                       format: date
 *                       description: Fecha del partido en formato YYYY-MM-DD.
 *                       example: "2024-08-30"
 *                     start_time:
 *                       type: string
 *                       format: time
 *                       description: Hora de inicio del partido en formato HH:MM.
 *                       example: "15:00"
 *                     field_name:
 *                       type: string
 *                       description: Nombre del campo de juego donde se disputará el partido.
 *                       example: "Estadio Nacional"
 *           examples:
 *             application/json:
 *               summary: Ejemplo de solicitud para crear varios partidos
 *               value:
 *                 matches:
 *                   - home_team_id: 1
 *                     away_team_id: 2
 *                     competition_id: 3
 *                     roundCode: "R1"
 *                     match_date: "2024-08-30"
 *                     start_time: "15:00"
 *                     field_name: "Estadio Nacional"
 *                   - home_team_id: 4
 *                     away_team_id: 5
 *                     competition_id: 3
 *                     roundCode: "R2"
 *                     match_date: "2024-08-31"
 *                     start_time: "17:00"
 *                     field_name: "Estadio Municipal"
 *     responses:
 *       '200':
 *         description: Partidos agregados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Partidos agregados exitosamente"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del partido creado.
 *                         example: 1
 *                       home_team_id:
 *                         type: integer
 *                         description: ID del equipo local.
 *                         example: 1
 *                       away_team_id:
 *                         type: integer
 *                         description: ID del equipo visitante.
 *                         example: 2
 *                       competition_id:
 *                         type: integer
 *                         description: ID de la competición.
 *                         example: 3
 *                       round_id:
 *                         type: integer
 *                         description: ID de la ronda.
 *                         example: 10
 *                       match_date:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora del partido en formato ISO 8601.
 *                         example: "2024-08-30T15:00:00Z"
 *       '400':
 *         description: Error de validación. Uno o más campos son inválidos o faltan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todos los campos son requeridos para todos los partidos"
 *                 data:
 *                   type: null
 *       '500':
 *         description: Error interno del servidor. Ocurrió un problema al procesar la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al crear partidos"
 *                 data:
 *                   type: string
 *                   example: "Detalles del error"
 */
router.post('/addMultipleMatches', matchController.addMultipleMatches);

module.exports = router;