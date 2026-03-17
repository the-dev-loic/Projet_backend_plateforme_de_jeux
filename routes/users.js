/***********************************************************************************************************************
 * Program name :           routes/users.js
 * Description :            API off the table users
 * Author :                 Gatien Clerc
 * Creation date :          11.04.2026
 * Modified by :            Gatien Clerc
 * Modification date :      04.03.2026
 * Version :                0.1.6
 **********************************************************************************************************************/
"use strict";
import express from 'express';
import { CRUD } from "../database/database-connection.js";

const router = express.Router();

/**
* @swagger
* /api/users:
*   post:
*     tags:
*       - Users
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
*         description: users created successfully
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
    let response = await CRUD.createInEntity("users", ['username', 'email', 'password'], data);
    res.status(201).json(response)
})

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
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
        const allUsers = await CRUD.getAllFromEntity("users", column, filter, limit);
        res.status(200).json(allUsers);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
})

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
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
    let users = await CRUD.getFromEntityById("users", id);
    res.status(200).json(users)
})

/**
* @swagger
* /api/users{id}:
*   put:
*     tags:
*       - Users
*     summary: Edit a users
*     description: Edit a users by its ID.
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*           minimum: 1
*         description: The id of the users to update
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
*         description: Successfully edited the users
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
*         description: users not found
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
    let response = await CRUD.updateInEntity("users", id,['username', 'email', 'password'], data)
    res.status(200).json(response)
})

/**
 *  @swagger
 *  /api/users{id}:
 *    delete:
 *       tags:
 *         - Users
 *       summary: Delete a users
 *       description: Delete a specific users by its ID.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the users
 *           example: 1
 *       responses:
 *         204:
 *           description: users deleted successfully
 *         400:
 *           description: Bad request
 *         404:
 *           description: users not found
 *         500:
 *           description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    let response = await CRUD.deleteFromEntity("users", id)
    res.status(204).json(response)
})

export default router;
