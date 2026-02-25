/***********************************************************************************************************************
 * Program name :           genres.js
 * Description :            route for genres table
 * Author :                 Cédric Jankiewicz
 * Creation date :          24.02.2026
 * Modified by :            Cédric Jankiewicz
 * Modification date :      25.02.2026
 * Version :                0.1.0
 **********************************************************************************************************************/
import express from 'express';
const router = express.Router();
import { CRUD } from "../database/database-connection.js";

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Get all genres
 *     description: Retrieve a list of genres.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Search activities by name
 *         example: Indie
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
 *         description: Successfully retrieved genres
 *       400:
 *         description: Bad request
 *       404:
 *         description: Page not found
 *       500:
 *         description: Internal server error
 *
 *   post:
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
 *                 example: rpg
 *     responses:
 *       200:
 *         description: genre created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *
 * /api/genres/{id}:
 *   get:
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
 *
 *   put:
 *     summary: Edit a genre
 *     description: Edit a genre by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the genre
 *         example: 1
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
 *                 example: rpg
 *     responses:
 *       200:
 *         description: Successfully edited the genre
 *       400:
 *         description: Bad request
 *       404:
 *         description: genre not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
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

router.get('/', async (req, res) => {
    const searchName = req.query.name; // get param 'name'
    const limit = req.query.limit; // get param 'limit'
    if (!(parseInt(limit) > 0) && limit) {
        res.status(400).json({error: "limit invalid number"});
        return;
    }
    let genres = await CRUD.getAllFromEntity("genres", "name", searchName, limit);
    res.status(200).json(genres)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    let genres = await CRUD.getFromEntityById("genres", id);
    res.status(200).json(genres)
})

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