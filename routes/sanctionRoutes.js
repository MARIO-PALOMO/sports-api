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

module.exports = router;
