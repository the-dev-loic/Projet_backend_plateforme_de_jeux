/***********************************************************************************************************************
 * Program name :           users_has_games.js
 * Description :            route for users_has_games table
 * Author :                 -Loïc Roux
 * Creation date :          04.03.2026
 * Modified by :            -Loïc Roux
 * Modification date :      -11.03.2026
 * Version :                0.1.1
 **********************************************************************************************************************/
import express from 'express';
const router = express.Router();
import { CRUD } from "../database/database-connection.js";


/**
 * @swagger
 * /api/users_has_games:
 *   post:
 *     tags:
 *       - UserHasGames
 *     summary: Create a user_has_game
 *     description: Create a new user_has_game.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - game_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               game_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: user_has_game created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    try {
    if (!(req.body.user_id > 0) || !(req.body.game_id > 0)) {
        res.status(400).json({ error: "invalid data, user_id and game_id should be a positive integer" });
        return;
    }
    const data = Object.values(req.body);
    let response = await CRUD.createInEntity("users_has_games", ['user_id', 'game_id'], data);
    res.status(201).json(response);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});


/**
 * @swagger
 * /api/users_has_games:
 *   get:
 *     tags:
 *       - UserHasGames
 *     summary: Get all users_has_games
 *     description: Retrieve a list of users_has_games.
 *     parameters:
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *         description: the column to filter by
 *         example: user_id
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: the filter to search by
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Max number of results
 *         example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved users_has_games
 *       400:
 *         description: Bad request
 *       404:
 *         description: Page not found
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
    const column = req.query.column;
    const filter = req.query.filter;
    const limit = parseInt(req.query.limit);

    if (!(parseInt(limit) > 0) && limit) {
        res.status(400).json({ error: "limit invalid number" });
        return;
    }
    let result = await CRUD.getAllFromEntity("users_has_games", column, filter, limit);
    res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});


/**
 * @swagger
 * /api/users_has_games/{id}:
 *   get:
 *     tags:
 *       - UserHasGames
 *     summary: Get a single user_has_game
 *     description: Retrieve a specific user_has_game by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user_has_game
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the user_has_game
 *       400:
 *         description: Bad request
 *       404:
 *         description: user_has_game not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res) => {
    try {
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({ error: "id should be a positive integer" });
        return;
    }
    let result = await CRUD.getFromEntityById("users_has_games", id);
    res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});


/**
 * @swagger
 * /api/users_has_games/{id}:
 *   put:
 *     tags:
 *       - UserHasGames
 *     summary: Edit a user_has_game
 *     description: Edit a user_has_game by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user_has_game
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - game_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               game_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Successfully edited the user_has_game
 *       400:
 *         description: Bad request
 *       404:
 *         description: user_has_game not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res) => {
    try {
    if (!(req.body.user_id > 0) || !(req.body.game_id > 0)) {
        res.status(400).json({ error: "invalid data, user_id and game_id should be a positive integer" });
        return;
    }
    const data = Object.values(req.body);
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({ error: "id should be a positive integer" });
        return;
    }
    let response = await CRUD.updateInEntity("users_has_games", id, ['user_id', 'game_id'], data);
    res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});


/**
 * @swagger
 * /api/users_has_games/{id}:
 *   delete:
 *     tags:
 *       - UserHasGames
 *     summary: Delete a user_has_game
 *     description: Delete a specific user_has_game by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user_has_game
 *         example: 1
 *     responses:
 *       204:
 *         description: user_has_game deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: user_has_game not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    try {
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({ error: "id should be a positive integer" });
        return;
    }
    let response = await CRUD.deleteFromEntity("users_has_games", id);
    res.status(204).json(response);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});


export default router;