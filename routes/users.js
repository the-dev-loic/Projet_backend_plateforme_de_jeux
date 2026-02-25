/***********************************************************************************************************************
 * Program name :           routes/users.js
 * Description :            API off the table users
 * Author :                 Gatien Clerc
 * Creation date :          11.04.2026
 * Modified by :            Gatien Clerc
 * Modification date :      25.02.2026
 * Version :                0.1.5
 **********************************************************************************************************************/
"use strict";
import express from 'express';
import { CRUD } from "../database/database-connection.js";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of users.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Search users by name
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
 *         description: Successfully retrieved genres
 *       400:
 *         description: Bad request
 *       404:
 *         description: Page not found
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a users
 *     description: Create a new users.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: PlayerOne
 *               email:
 *                 type: string
 *                 example: PlayerOne@gmail.com
 *               password:
 *                 type: string
 *                 example: Pa$$$w0rd
 *     responses:
 *       200:
 *         description: genre created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *
 * /api/users/{id}:
 *   get:
 *     summary: Get a single users
 *     description: Retrieve a specific users by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the users
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the users
 *       400:
 *         description: Bad request
 *       404:
 *         description: users not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Edit a users
 *     description: Edit a users by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the users
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: PlayerOne
 *               email:
 *                 type: string
 *                 example: PlayerOne@gmail.com
 *               password:
 *                 type: string
 *                 example: Pa$$$w0rd
 *     responses:
 *       200:
 *         description: Successfully edited the users
 *       400:
 *         description: Bad request
 *       404:
 *         description: users not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a users
 *     description: Delete a specific users by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the users
 *         example: 1
 *     responses:
 *       200:
 *         description: users deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: users not found
 *       500:
 *         description: Internal server error
 */

router.get('/', async (req, res) => {
    const searchName = req.query.name;
    const limit = req.query.limit;
    let users = await CRUD.getAllFromEntity('users', 'username', searchName, limit);
    console.log(users);

    res.json(users);
});


router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let users = await CRUD.getFromEntityById("users", id);
    res.json(users);
});

router.post('/', async (req, res) => {
    res.json(req.body);
    const data = Object.values(req.body);
    let response = await CRUD.createInEntity("users", ['username', 'email', 'password'], data);
    res.json(response);
});

router.put('/:id', async (req, res) => {
    res.json(req.body);
    const data = Object.values(req.body);
    const id = parseInt(req.params.id);
    let response = await CRUD.updateInEntity("users", id, ['username', 'email', 'password'], data);
    res.json(response);
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let response = await CRUD.deleteFromEntity("users", id);
    res.json(response);
});

export default router;
