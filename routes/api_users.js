/***********************************************************************************************************************
 * Program name :           api_users.js
 * Description :            router for the APIUsers CRUD routes
 * Author :                 Thierry Perroud
 * Creation date :          11.03.2026
 * Modified by :
 * Modification date :
 * Version :                0.1.1
 **********************************************************************************************************************/
"use strict";

/***********************************************************************************************************************
 *  Imports
 **********************************************************************************************************************/
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { CRUD } from "../database/database-connection.js";
import { privateKey } from "../auth/private_key.js";

/***********************************************************************************************************************
 *  Routes
 **********************************************************************************************************************/
const apiUsersRouter = express.Router();  // Router for http://localhost:3000/api/Games

/* Create *************************************************************************************************************/
/**
 * @swagger
 * /api/signin:
 *   post:
 *     tags:
 *       - API
 *     summary: Creates an API user
 *     description: Creates a new API user into the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: myUsername
 *                 maxLength: 45
 *               password:
 *                 type: string
 *                 example: Pa$$$w0rd
 *     responses:
 *       201:
 *         description: The new API user was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *       400:
 *         description: At least one mandatory parameter is empty. | The username cannot be longer than 45 characters.
 *       500:
 *         description: Internal server error.
 */
apiUsersRouter.post("/signin", async (req, res) => {
    try {
        // Variables
        const {username, password} = req.body;

        // Error handling
        if (username == null || password == null) {
            return res.status(400).json({error: "At least one mandatory parameter is empty."});
        }

        if (username.length > 45) {
            return res.status(400).json({error: "The username cannot be longer than 45 characters."});
        }

        // Creating the API user
        const newUser = await CRUD.createAPIUser(username, password);
        const message = `API user ${newUser.username} was successfully created!`;
        res.status(201).json({message: message, user: newUser});
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

/* Read ***************************************************************************************************************/
/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - API
 *     summary: Gets an API user
 *     description: Gets an API user based on its username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: myUsername
 *                 maxLength: 45
 *               password:
 *                 type: string
 *                 example: Pa$$$w0rd
 *     responses:
 *       200:
 *         description: Liste des activités
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: At least one mandatory parameter is empty. | The username cannot be longer than 45 characters.
 *       401:
 *         description: Incorrect username or password.
 *       500:
 *         description: Internal server error.
 */
apiUsersRouter.post("/login", async (req, res) => {
    try {
        // Variables
        const {username, password} = req.body;

        // Error handling
        if (username == null || password == null) {
            return res.status(400).json({error: "At least one mandatory parameter is empty."});
        }

        if (username.length > 45) {
            return res.status(400).json({error: "The username cannot be longer than 45 characters."});
        }

        // Getting the API user from Database
        const user = await CRUD.getAPIUser(username);

        if (user === undefined) {
            res.status(401).json({error: "Incorrect username or password"});
        }
        else {
            const isPwdValid = await bcrypt.compare(password, user.password);
            if (!isPwdValid) {
                res.status(401).json({error: "Incorrect username or password"});
            }
            else {
                const token = jwt.sign(
                    {userId: user.id},
                    privateKey,
                    {expiresIn: '1d'}
                )
                res.status(200).json({message: 'User connected', token: token});
            }
        }
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

/***********************************************************************************************************************
 *  Exports
 **********************************************************************************************************************/
export default apiUsersRouter;