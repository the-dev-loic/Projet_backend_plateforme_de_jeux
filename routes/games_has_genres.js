/***********************************************************************************************************************
 * Program name :           game_has_genres.js
 * Description :            route for game_has_genres table
 * Author :                 Cédric Jankiewicz
 * Creation date :          04.03.2026
 * Modified by :            Cédric Jankiewicz
 * Modification date :      04.03.2026
 * Version :                0.1.0
 **********************************************************************************************************************/
import express from 'express';
const router = express.Router();
import { CRUD } from "../database/database-connection.js";

/**
 * @swagger
 * /api/games_has_genres:
 *   post:
 *     tags:
 *       - GamesHasGenres
 *     summary: Create a games has genres
 *     description: Create a new games has genres
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - game_id
 *               - genre_id
 *             properties:
 *               game_id:
 *                 type: integer
 *                 example: 1
 *               genre_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: users created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 game_id:
 *                   type: integer
 *                 genre_id:
 *                   type: integer
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    if (!(req.body.game_id > 0) || !(req.body.genre_id > 0)) {
        res.status(400).json({error: "invalid data, game_id and genre_id should be a positive integer"});
        return;
    }
    const data = Object.values(req.body);
    let response = await CRUD.createInEntity("games_has_genres", ['game_id', 'genre_id'], data);
    res.status(201).json(response)
})


/**
 * @swagger
 * /api/games_has_genres:
 *  get:
 *     tags:
 *       - GamesHasGenres
 *     summary: Get all games has genres
 *     description: Retrieve a list of games has genres
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Search users by Move File…
 *         example: one
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of results to return
 *         example: 10
 *     responses:
 *       200:
 *         description: Liste des utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 game_id:
 *                   type: integer
 *                 genre_id:
 *                   type: integer
 *       400:
 *         description: Bad request
 *       404:
 *         description: Page not found
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    const column = req.query.column;
    const filter = req.query.filter;
    const limit = parseInt(req.query.limit);

    if (!(parseInt(limit) > 0) && limit) {
        res.status(400).json({error: "limit invalid number"});
        return;
    }
    let genres = await CRUD.getAllFromEntity("games_has_genres", column, filter, limit);
    res.status(200).json(genres)
})


/**
 * @swagger
 * /api/games_has_genres/{id}:
 *   get:
 *     tags:
 *       - GamesHasGenres
 *     summary: Get a single game has genre
 *     description: Retrieve a specific game has genre by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game has genre
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the game has genre
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 game_id:
 *                   type: integer
 *                 genre_id:
 *                   type: integer
 *       400:
 *         description: Bad request
 *       404:
 *         description: users not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    let genres = await CRUD.getFromEntityById("games_has_genres", id);
    res.status(200).json(genres)
})


/**
 * @swagger
 * /api/games_has_genres/{id}:
 *   put:
 *     tags:
 *       - GamesHasGenres
 *     summary: Edit a game has genre
 *     description: Edit a game has genre by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The id of the game has genre to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - game_id
 *               - genre_id
 *             properties:
 *               game_id:
 *                 type: integer
 *                 example: 1
 *               genre_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully edited the game has genre
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 game_id:
 *                   type: integer
 *                 genre_id:
 *                   type: integer
 *       400:
 *         description: Bad request
 *       404:
 *         description: users not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res) => {
    if (!(req.body.game_id > 0) || !(req.body.genre_id > 0)) {
        res.status(400).json({error: "invalid data, game_id and genre_id should be a positive integer"});
        return;
    }
    const data = Object.values(req.body);
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    let response = await CRUD.updateInEntity("games_has_genres", id, ['game_id', 'genre_id'], data);
    res.status(200).json(response);
})


/**
 * @swagger
 * /api/games_has_genres/{id}:
 *   delete:
 *     tags:
 *       - GamesHasGenres
 *     summary: Delete a game has genre
 *     description: Delete a specific game has genre by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game has genre
 *         example: 1
 *     responses:
 *       204:
 *         description: game has genre deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: game has genre not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    let response = await CRUD.deleteFromEntity("games_has_genres", id)
    res.status(204).json(response)
})


export default router;