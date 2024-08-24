const express = require("express");
const router = express.Router();
const clog = require("./controllers/log.controller");
const cuser = require("./controllers/user.controller");
const cstate = require("./controllers/state.controller");
const cfield = require('./controllers/field.controller');
const cround = require('./controllers/round.controller');
const ccompetition = require('./controllers/competition.controller');
const cteam = require('./controllers/team.controller');
const cplayer = require('./controllers/player.controller');
const csantiontype = require('./controllers/sanction_type.controller');

/**
 * @swagger
 * tags:
 *   - name: Registro
 *     description: Servicios de Log
 */

/**
 * @swagger
 * /log/getAll:
 *   get:
 *     tags:
 *       - Registro
 *     summary: Obtiene todos los registros de logs
 *     description: Devuelve una lista de todos los registros de logs.
 *     responses:
 *       200:
 *         description: Lista de registros de logs
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
 *                       id:
 *                         type: string
 *                         example: 'a-unique-id'
 *                       entity:
 *                         type: string
 *                         example: 'User'
 *                       method:
 *                         type: string
 *                         example: 'POST'
 *                       error:
 *                         type: string
 *                         example: 'None'
 *                       payload:
 *                         type: string
 *                         example: '{"key": "value"}'
 *                 message:
 *                   type: string
 *                   example: 'Success'
 *       500:
 *         description: Error interno del servidor al obtener los registros de logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: 'Get all logs error: [error details]'
 */
router.get('/log/getAll', clog.getAll);

/**
 * @swagger
 * /log/add:
 *   post:
 *     tags:
 *       - Registro
 *     summary: Agrega un nuevo registro de log
 *     description: Permite agregar un nuevo registro de log con los detalles especificados en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entity:
 *                 type: string
 *                 example: 'User'
 *               method:
 *                 type: string
 *                 example: 'POST'
 *               error:
 *                 type: string
 *                 example: 'None'
 *               payload:
 *                 type: string
 *                 example: '{"key": "value"}'
 *             required:
 *               - entity
 *               - method
 *               - error
 *               - payload
 *     responses:
 *       200:
 *         description: Registro de log agregado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 'a-unique-id'
 *                     entity:
 *                       type: string
 *                       example: 'User'
 *                     method:
 *                       type: string
 *                       example: 'POST'
 *                     error:
 *                       type: string
 *                       example: 'None'
 *                     payload:
 *                       type: string
 *                       example: '{"key": "value"}'
 *                 message:
 *                   type: string
 *                   example: 'Success'
 *       400:
 *         description: Error en la solicitud debido a campos faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: 'All fields are required'
 *       500:
 *         description: Error interno del servidor al agregar el registro de log
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: 'Add logs error: [error details]'
 */
router.post('/log/add', clog.add);

/**
 * @swagger
 * tags:
 *   - name: Gestión de Usuarios
 *     description: Servicios de Usuarios
 */

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     tags:
 *       - Gestión de Usuarios
 *     summary: Obtiene todos los usuarios
 *     description: Devuelve una lista de todos los usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: '1'
 *                   username:
 *                     type: string
 *                     example: 'johndoe'
 *                   email:
 *                     type: string
 *                     example: 'johndoe@example.com'
 */
router.get('/user/getAll', cuser.getAll);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - Gestión de Usuarios
 *     summary: Inicia sesión de un usuario
 *     description: Permite a un usuario iniciar sesión con sus credenciales.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'johndoe'
 *               password:
 *                 type: string
 *                 example: 'password123'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/user/login', cuser.get);

/**
 * @swagger
 * /user/add:
 *   post:
 *     tags:
 *       - Gestión de Usuarios
 *     summary: Agrega un nuevo usuario
 *     description: Permite agregar un nuevo usuario al sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'johndoe'
 *               email:
 *                 type: string
 *                 example: 'johndoe@example.com'
 *               password:
 *                 type: string
 *                 example: 'password123'
 *     responses:
 *       200:
 *         description: Usuario agregado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/user/add', cuser.add);

/**
 * @swagger
 * tags:
 *   name: Estados de Juego
 *   description: API para la gestión de estados
 */

/**
 * @swagger
 * /states/getAll:
 *   get:
 *     summary: Obtiene todos los registros de states.
 *     tags: [Estados de Juego]
 *     responses:
 *       200:
 *         description: Lista de todos los registros de states.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ""
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         description: El ID del states.
 *                       name:
 *                         type: string
 *                         description: El nombre del states.
 *       500:
 *         description: Error al consultar states.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Error al consultar states: [detalle del error]"
 */
router.get('/states/getAll', cstate.getAll);

/**
 * @swagger
 * /states/{id}:
 *   get:
 *     summary: Consultar un registro de State por ID
 *     tags: [Estados de Juego]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del State a consultar
 *     responses:
 *       200:
 *         description: State encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *       404:
 *         description: State no encontrado
 *       500:
 *         description: Error al consultar states
 */
router.get('/states/:id', cstate.getStateById);

/**
 * @swagger
 * /states/addState:
 *   post:
 *     summary: Agregar un nuevo State
 *     tags: [Estados de Juego]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del State
 *     responses:
 *       200:
 *         description: State creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *       500:
 *         description: Error al crear states
 */
router.post('/states/addState', cstate.addState);

/**
 * @swagger
 * /states/addMultipleStates:
 *   post:
 *     summary: Agregar múltiples registros de State
 *     tags: [Estados de Juego]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - states
 *             properties:
 *               states:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nombre del State
 *     responses:
 *       200:
 *         description: States creados con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
 *       500:
 *         description: Error al crear states
 */
router.post('/states/addMultipleStates', cstate.addMultipleStates);

/**
 * @swagger
 * tags:
 *   - name: Canchas Deportivas
 *     description: Operaciones relacionadas con las canchas deportivas
 */

/**
 * @swagger
 * /fields/getAll:
 *   get:
 *     summary: Obtener todas las canchas deportivas
 *     description: Retorna una lista de todas las canchas deportivas registradas.
 *     tags: 
 *       - Canchas Deportivas
 *     responses:
 *       200:
 *         description: Canchas deportivas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       location:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Error al consultar las canchas deportivas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.get('/fields/getAll', cfield.getAll);

/**
 * @swagger
 * /field/{id}:
 *   get:
 *     summary: Obtener una cancha deportiva por ID
 *     description: Retorna un registro de cancha deportiva basado en el ID proporcionado.
 *     tags:
 *       - Canchas Deportivas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cancha deportiva
 *     responses:
 *       200:
 *         description: Cancha deportiva encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     location:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Cancha deportiva no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       500:
 *         description: Error al consultar cancha deportiva por ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.get('/field/:id', cfield.getFieldById);

/**
 * @swagger
 * /fields/addField:
 *   post:
 *     summary: Crear una nueva cancha deportiva
 *     description: Crea y retorna un nuevo registro de cancha deportiva.
 *     tags:
 *       - Canchas Deportivas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cancha deportiva creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     location:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: Error al crear cancha deportiva
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.post('/fields/addField', cfield.addField);

/**
 * @swagger
 * /fields/addMultipleFields:
 *   post:
 *     summary: Crear múltiples canchas deportivas
 *     description: Crea múltiples registros de canchas deportivas y los retorna.
 *     tags:
 *       - Canchas Deportivas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fields:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     location:
 *                       type: string
 *     responses:
 *       200:
 *         description: Canchas deportivas creadas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       location:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: El campo fields debe ser un array y no estar vacío.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       500:
 *         description: Error al agregar múltiples canchas deportivas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.post('/fields/addMultipleFields', cfield.addMultipleFields);

/**
 * @swagger
 * tags:
 *   - name: Eliminatorias
 *     description: Operaciones relacionadas con las eliminatorias
 */

/**
 * @swagger
 * /rounds/getAll:
 *   get:
 *     summary: Obtener todas las eliminatorias
 *     description: Retorna una lista de todas las eliminatorias registradas.
 *     tags: 
 *       - Eliminatorias
 *     responses:
 *       200:
 *         description: Eliminatorias encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Error al consultar eliminatorias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.get('/rounds/getAll', cround.getAll);

/**
 * @swagger
 * /rounds/{id}:
 *   get:
 *     summary: Obtener una eliminatoria por ID
 *     description: Retorna un registro de eliminatoria basado en el ID proporcionado.
 *     tags:
 *       - Eliminatorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la eliminatoria
 *     responses:
 *       200:
 *         description: Ronda encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Ronda no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       500:
 *         description: Error al consultar eliminatoria por ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.get('/rounds/:id', cround.getRoundById);

/**
 * @swagger
 * /rounds/addRound:
 *   post:
 *     summary: Crear una nueva eliminatoria
 *     description: Crea y retorna un nuevo registro de eliminatoria.
 *     tags:
 *       - Eliminatorias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ronda creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: Error al crear eliminatoria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.post('/rounds/addRound', cround.addRound);

/**
 * @swagger
 * /rounds/addMultipleRounds:
 *   post:
 *     summary: Crear múltiples eliminatorias
 *     description: Crea múltiples registros de eliminatorias y los retorna.
 *     tags:
 *       - Eliminatorias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rounds:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *     responses:
 *       200:
 *         description: Eliminatorias creadas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: El campo rounds debe ser un array y no estar vacío.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       500:
 *         description: Error al agregar múltiples eliminatorias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.post('/rounds/addMultipleRounds', cround.addMultipleRounds);

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
router.get('/competitions/getAll', ccompetition.getAllCompetitions);

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
router.get('/competitions/:id', ccompetition.getCompetitionById);

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
router.post('/competitions/addCompetition', ccompetition.addCompetition);

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
router.put('/competitions/:id/updateCompetitionDetails', ccompetition.updateCompetitionDetails);

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
router.put('/competitions/:id/updateCompetitionDates', ccompetition.updateCompetitionDates);

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
router.put('/competitions/:id/updateCompetitionLogos', ccompetition.updateCompetitionLogos);

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
router.put('/competitions/:id/updateCompetitionInfo', ccompetition.updateCompetitionInfo);

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
router.get('/teams/getAll', cteam.getAll);

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
 *       404:
 *         description: Equipo no encontrado.
 *       500:
 *         description: Error al consultar el equipo.
 */
router.get('/teams/:id', cteam.getTeamById);

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
router.post('/teams/addTeam', cteam.addTeam);

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
router.post('/teams/addMultipleTeams', cteam.addMultipleTeams);

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
 *       '201':
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
 *       '400':
 *         description: Error en la solicitud, el campo "logo" es obligatorio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El campo 'logo' es obligatorio en cada equipo"
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
router.post('/teams/addMultipleTeamsLogo', cteam.addMultipleTeamsLogo);

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
 *       404:
 *         description: Equipo no encontrado.
 *       500:
 *         description: Error al actualizar los detalles del equipo.
 */
router.put('/teams/:id/updateTeamDetails', cteam.updateTeamDetails);

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
 *       404:
 *         description: Equipo no encontrado.
 *       500:
 *         description: Error al actualizar el logo del equipo.
 */
router.put('/teams/:id/updateTeamLogo', cteam.updateTeamLogo);

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
 *       404:
 *         description: Equipo no encontrado.
 *       500:
 *         description: Error al actualizar el equipo.
 */
router.put('/teams/:id/updateTeamInfo', cteam.updateTeamInfo);

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
 *       404:
 *         description: Equipo no encontrado.
 *       500:
 *         description: Error al eliminar el equipo.
 */
router.delete('/teams/:id/deleteTeam', cteam.deleteTeam);

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
router.get('/players/getAll', cplayer.getAllPlayers);

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
router.get('/players/:teamId/getAllPlayersByTeamId', cplayer.getAllPlayersByTeamId);

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
router.get('/players/:id', cplayer.getPlayerById);

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
router.post('/players/addPlayer', cplayer.addPlayer);

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
 *           example:
 *             - name: "John Doe"
 *               document_number: "1234567890"
 *               birthdate: "1990-01-01"
 *               player_number: "10"
 *               team_name: "Team A"
 *             - name: "Jane Doe"
 *               document_number: "0987654321"
 *               birthdate: "1992-02-02"
 *               player_number: "15"
 *               team_name: "Team B"
 *     responses:
 *       200:
 *         description: Jugadores creados exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Jugadores creados exitosamente
 *               data:
 *                 - id: "e7b8d7b7-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                   name: "John Doe"
 *                   document_number: "1234567890"
 *                   birthdate: "1990-01-01"
 *                   player_number: "10"
 *                   team_id: "b9b8d8b8-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                   photo: "base64string"
 *                 - id: "c8c8d8c8-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                   name: "Jane Doe"
 *                   document_number: "0987654321"
 *                   birthdate: "1992-02-02"
 *                   player_number: "15"
 *                   team_id: "d9d9d9d9-9f71-4ad6-b5bc-4f7e1e2f1b1d"
 *                   photo: "base64string"
 *       400:
 *         description: Error al crear jugadores
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               error: "Error al crear jugadores"
 *       500:
 *         description: Error al cargar la foto predeterminada
 *         content:
 *           application/json:
 *             example:
 *               data: null
 *               error: "Error al cargar la foto predeterminada."
 */
router.post('/players/addMultiplePlayers', cplayer.addMultiplePlayers);

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
router.put('/players/:id/updatePlayer', cplayer.updatePlayer);

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
router.put('/players/:id/updatePlayerPhoto', cplayer.updatePlayerPhoto);

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
router.delete('/players/:id/deletePlayer', cplayer.deletePlayer);

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
router.delete('/players/deleteMultiplePlayers', cplayer.deleteMultiplePlayers);

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
router.get('/sanctiontypes/getAll', csantiontype.getAllSanctionTypes);

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
router.get('/sanctiontypes/:id', csantiontype.getSanctionTypeById);

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
 *       201:
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
router.post('/sanctiontypes/addSanctionType', csantiontype.addSanctionType);

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
 *       201:
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
router.post('/sanctiontypes/addMultipleSanctionTypes', csantiontype.addMultipleSanctionTypes);

module.exports = router;
