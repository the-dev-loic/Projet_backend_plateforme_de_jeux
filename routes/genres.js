/***********************************************************************************************************************
 * Program name :           genres.js
 * Description :            route for genres table
 * Author :                 Cédric Jankiewicz
 * Creation date :          24.02.2026
 * Modified by :            Gatien Clerc
 * Modification date :      04.03.2026
 * Version :                0.1.4
 **********************************************************************************************************************/
import express from 'express';
const router = express.Router();
import { CRUD } from "../database/database-connection.js";


/**
 * @swagger
 * /api/genres:
 *   post:
 *     tags:
 *       - Genres
 *     summary: Create a genre
 *     description: Create a new genre.
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
 *                 example: RPG
 *     responses:
 *       200:
 *         description: genre created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    res.json(req.body);
    const data = Object.values(req.body);
    if (data[0] === "" || !data[0] || data[0].length > 45) {
        res.status(400).json({error: "invalid name, name need to be under 45 characters"});
        return;
    }
    let response = await CRUD.createInEntity("genres", ['name'], data);
    res.status(200).json(response)
})


/**
 * @swagger
 * /api/genres:
 *  get:
 *     tags:
 *       - Genres
 *     summary: Get all genres
 *     description: Retrieve a list of genres.
 *     parameters:
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *         description: the column to filter by
 *         example: name
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: the filter to search by
 *         example: RPG
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Max number of result
 *         example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved genres
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
    let genres = await CRUD.getAllFromEntity("genres", column, filter, limit);
    res.status(200).json(genres)
})


/**
 * @swagger
 * /api/genres/{id}:
 *   get:
 *     tags:
 *       - Genres
 *     summary: Get a single genre
 *     description: Retrieve a specific genre by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the genre
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the genre
 *       400:
 *         description: Bad request
 *       404:
 *         description: genre not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    let genres = await CRUD.getFromEntityById("genres", id);
    res.status(200).json(genres)
})


/**
 * @swagger
 * /api/genres/{id}:
 *   put:
 *     tags:
 *       - Genres
 *     summary: Edit a genre
 *     description: Edit a genre by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The id of the genre to update
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
 *                 example: RPG
 *     responses:
 *       200:
 *         description: Successfully edited the genre
 *       400:
 *         description: Bad request
 *       404:
 *         description: genre not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res) => {
    res.json(req.body);
    const data = Object.values(req.body);
    if (data[0] === "" || data[0].length > 45) {
        res.status(400).json({error: "invalid name, name need to be under 45 characters"});
        return;
    }
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    let response = await CRUD.updateInEntity("genres", id, ['name'], data)
    res.status(200).json(response)
})


/**
 * @swagger
 * /api/genres/{id}:
 *   delete:
 *     tags:
 *       - Genres
 *     summary: Delete a genre
 *     description: Delete a specific genre by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the genre
 *         example: 1
 *     responses:
 *       200:
 *         description: genre deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: genre not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    let response = await CRUD.deleteFromEntity("genres", id)
    res.status(200).json(response)
})

export default router;