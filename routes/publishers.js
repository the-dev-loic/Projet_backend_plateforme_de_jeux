/***********************************************************************************************************************
 * Program name :           publishers.js
 * Description :            route for publishers table
 * Author :                 Gatien Clerc
 * Creation date :          17.03.2026
 * Modified by :            ---
 * Modification date :      ---
 * Version :                0.1.0
 **********************************************************************************************************************/
import express from 'express';
import { CRUD } from "../database/database-connection.js";

const router = express.Router();

/**
 * @swagger
 * /api/publishers:
 *   post:
 *     tags:
 *       - Publishers
 *     summary: Create a publisher
 *     description: Create a new publisher.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: john doe
 *               email:
 *                 type: string
 *                 example: john.doe@exemple.com
 *               password:
 *                 type: string
 *                 example: Pa$$w0rd
 *     responses:
 *       201:
 *         description: publisher created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    const data = Object.values(req.body);
    if (data[0] === "" || !data[0] || data[0].length > 45) {
        res.status(400).json({error: "invalid name, name need to be under 45 characters"});
        return;
    }
    let response = await CRUD.createInEntity("publishers", ['username', 'email', 'password'], data);
    res.status(201).json(response)
})

/**
 * @swagger
 * /api/publishers:
 *   get:
 *     tags:
 *       - Publishers
 *     summary: Get all publishers
 *     description: Retrieve a list of publishers.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Search publishers by name
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
 *                 username:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Page not found
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        // Variables
        const column = req.query.column;
        const filter = req.query.filter;
        const limit = parseInt(req.query.limit);

        // Reading the entries
        const allPublishers = await CRUD.getAllFromEntity("publishers", column, filter, limit);
        res.status(200).json(allPublishers);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
})

/**
 * @swagger
 * /api/publishers/{id}:
 *   get:
 *     tags:
 *       - Publishers
 *     summary: Get a single publishers
 *     description: Retrieve a specific publishers by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the publishers
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the publishers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: publishers not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    let publishers = await CRUD.getFromEntityById("publishers", id);
    res.status(200).json(publishers)
})

/**
 * @swagger
 * /api/publishers/{id}:
 *   put:
 *     tags:
 *       - Publishers
 *     summary: Edit a publishers
 *     description: Edit a publishers by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The id of the publishers to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@exemple.com
 *               password:
 *                 type: string
 *                 example: Pa$$w0rd
 *     responses:
 *       200:
 *         description: Successfully edited the publishers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: publishers not found
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
    let response = await CRUD.updateInEntity("publishers", id,['username', 'email', 'password'], data)
    res.status(200).json(response)
})

/**
 *  @swagger
 *  /api/publishers/{id}:
 *    delete:
 *       tags:
 *         - Publishers
 *       summary: Delete a publishers
 *       description: Delete a specific publishers by its ID.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the publishers
 *           example: 1
 *       responses:
 *         204:
 *           description: publishers deleted successfully
 *         400:
 *           description: Bad request
 *         404:
 *           description: publishers not found
 *         500:
 *           description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    let response = await CRUD.deleteFromEntity("publishers", id)
    res.status(204).json(response)
})

export default router;
