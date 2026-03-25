/***********************************************************************************************************************
 * Program name :           routes/users.js
 * Description :            API off the table users
 * Author :                 Gatien Clerc
 * Creation date :          11.03.2026
 * Modified by :            Thierry Perroud
 * Modification date :      25.03.2026
 * Version :                0.1.7
 **********************************************************************************************************************/
"use strict";
import express from 'express';

import auth from "../auth/auth.js";
import { CRUD } from "../database/database-connection.js";
import {hashPassword} from "../functions/hash.js";

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
router.post('/', auth, async (req, res) => {
    try {
    if (req.body.username === "" || !req.body.username || req.body.username.length > 45) {
        res.status(400).json({error: "invalid name, name need to be under 45 characters"});
        return;
    }
    if (req.body.email === "" || !req.body.email || req.body.email.length > 255) {
        res.status(400).json({error: "invalid email, email need to be under 45 characters"});
        return;
    }
    if (req.body.password === "" || !req.body.password || req.body.password.length > 64) {
        res.status(400).json({error: "invalid password, password need to be under 45 characters"});
        return;
    }
    req.body.password = await hashPassword(req.body.password, 10);
    const data = Object.values(req.body);
    let response = await CRUD.createInEntity("users", ['username', 'email', 'password'], data);
    res.status(201).json(response)
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
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
router.get('/', auth, async (req, res) => {
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
router.get('/:id', auth, async (req, res) => {
    try {
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    let users = await CRUD.getFromEntityById("users", id);
    res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
})

/**
 * @swagger
 * /api/users/{id}:
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
router.put('/:id', auth, async (req, res) => {
    try {
    if (req.body.username === "" || !req.body.username || req.body.username.length > 45) {
        res.status(400).json({error: "invalid name, name need to be under 45 characters"});
        return;
    }
    if (req.body.email === "" || !req.body.email || req.body.email.length > 255) {
        res.status(400).json({error: "invalid email, email need to be under 45 characters"});
        return;
    }
    if (req.body.password === "" || !req.body.password || req.body.password.length > 64) {
        res.status(400).json({error: "invalid password, password need to be under 45 characters"});
        return;
    }
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    req.body.password = await hashPassword(req.body.password, 10);
    const data = Object.values(req.body);
    let response = await CRUD.updateInEntity("users", id,['username', 'email', 'password'], data)
    res.status(200).json(response)
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
})

/**
 *  @swagger
 *  /api/users/{id}:
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
router.delete('/:id', auth, async (req, res) => {
    try {
    const id = parseInt(req.params.id);
    if (!(id > 0)) {
        res.status(400).json({error: "id should be a positive integer"});
        return;
    }
    let response = await CRUD.deleteFromEntity("users", id)
    res.status(204).json(response)
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
})

export default router;
