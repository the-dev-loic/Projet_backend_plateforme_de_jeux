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
 *       - GameHasGenres
 *     summary: Create a game_has_genre
 *     description: Create a new game_has_genre.
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
 *                 exemple: 4
 *     responses:
 *       201:
 *         description: genre created successfully
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
 *   get:
 *     tags:
 *       - GameHasGenres
 *     summary: Get all games_has_genres
 *     description: Retrieve a list of games_has_genres.
 *     parameters:
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *         description: the column to filter by
 *         example: game_id
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: the filter to search by
 *         example: 2
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Max number of result
 *         example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved games_has_genres
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
 *       - GameHasGenres
 *     summary: Get a single game_has_genre
 *     description: Retrieve a specific game_has_genre by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game_has_genre
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the game_has_genre
 *       400:
 *         description: Bad request
 *       404:
 *         description: game_has_genre not found
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
 *       - GameHasGenres
 *     summary: Edit a game_has_genre
 *     description: Edit a game_has_genre by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game_has_genre
 *         example: 1
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
 *                 exemple: 3
 *     responses:
 *       200:
 *         description: Successfully edited the game_has_genre
 *       400:
 *         description: Bad request
 *       404:
 *         description: game_has_genre not found
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
 * /api/game_has_genres/{id}:
 *   delete:
 *     tags:
 *       - GameHasGenres
 *     summary: Delete a game_has_genre
 *     description: Delete a specific game_has_genre by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game_has_genre
 *         example: 1
 *     responses:
 *       204:
 *         description: game_has_genre deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: game_has_genre not found
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