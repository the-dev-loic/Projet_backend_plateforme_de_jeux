/***********************************************************************************************************************
 * Program name :           dlcs.js
 * Description :            router for the DLCs CRUD routes
 * Author :                 Thierry Perroud
 * Creation date :          04.03.2026
 * Modified by :            Thierry Perroud
 * Modification date :      25.03.2026
 * Version :                0.1.1
 **********************************************************************************************************************/
"use strict";

/***********************************************************************************************************************
 *  Imports
 **********************************************************************************************************************/
import express from "express";

import auth from "../auth/auth.js";
import { CRUD } from "../database/database-connection.js";

/***********************************************************************************************************************
 *  Routes
 **********************************************************************************************************************/
const dlcsRouter = express.Router();  // Router for http://localhost:3000/api/dlcs

/* Create *************************************************************************************************************/
/**
 * @swagger
 * /api/dlcs:
 *   post:
 *     tags:
 *       - DLCs
 *     summary: Creates a DLC
 *     description: Creates a new DLC into the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - game_id
 *               - name
 *               - price
 *             properties:
 *               game_id:
 *                 type: int
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: The name of my DLC
 *               description:
 *                 type: string
 *                 example: The description of my DLC
 *               price:
 *                 type: number
 *                 example: 15.00
 *     responses:
 *       201:
 *         description: The new DLC was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 game_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       400:
 *         description: At least one mandatory parameter is empty. | The id of the game must be a positive integer. | The name of the DLC cannot be longer than 100 characters. | The description of the DLC cannot be longer than 255 characters. | The price of the DLC must be a positive number, or zero.
 *       500:
 *         description: Internal server error.
 */
dlcsRouter.post("/", auth, async (req, res) => {
    try {
        // Variables
        const columns = ["game_id", "name", "description", "price"];
        const {game_id, name, description, price} = req.body;
        const data = [game_id, name, description, price];

        // Error handling
        if (game_id == null || name == null || price == null) {
            return res.status(400).json({error: "At least one mandatory parameter is empty."});
        }

        if (isNaN(game_id) || game_id < 1) {
            return res.status(400).json({error: "The id of the game must be a positive integer."});
        }

        if (name.length > 100) {
            return res.status(400).json({error: "The name of the DLC cannot be longer than 100 characters."});
        }

        if (description.length > 255) {
            return res.status(400).json({error: "The description of the DLC cannot be longer than 255 " +
                    "characters."});
        }

        if (isNaN(price) || price < 0) {
            return res.status(400).json({error: "The price of the DLC must be a positive number, or zero."})
        }

        //  Creating the entry
        const newDlc = await CRUD.createInEntity("dlcs", columns, data);
        res.status(201).json(newDlc);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

/* Read ***************************************************************************************************************/
/**
 * @swagger
 * /api/dlcs:
 *   get:
 *     tags:
 *       - DLCs
 *     summary: Returns all DLCs
 *     description: Returns a list of all DLCs with the ability of filtering or limiting the data
 *     parameters:
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *         description: The column to filter (optional, requires a filter)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: The filter to apply to the column (optional, requires a column)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of results (optional)
 *     responses:
 *       201:
 *         description: List of all DLCs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 game_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error.
 */
dlcsRouter.get("/", auth, async (req, res) => {
    try {
        // Variables
        const column = req.query.column;
        const filter = req.query.filter;
        const limit = parseInt(req.query.limit);

        // Reading the entries
        const allDlcs = await CRUD.getAllFromEntity("dlcs", column, filter, limit);
        res.status(200).json(allDlcs);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/dlcs/{id}:
 *   get:
 *     tags:
 *       - DLCs
 *     summary: Gets a DLC with an id
 *     description: Returns a DLC from its id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The id of the DLC
 *     responses:
 *       200:
 *         description: Returned DLC
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 game_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       400:
 *         description: The id must be a positive integer.
 *       404:
 *         description: DLC not found.
 *       500:
 *         description: Internal server error.
 */
dlcsRouter.get("/:id", auth, async (req, res) => {
    try {
        // Handling errors with the id parameter
        if (isNaN(req.params.id) || req.params.id < 1) {
            return res.status(400).json({error: "The id must be a positive integer."})
        }

        // Reading the entry
        const dlc = await CRUD.getFromEntityById("dlcs", req.params.id);

        // Error handling
        if (!dlc) {
            return res.status(404).json({error: "DLC not found."});
        }

        // sending the entry to user
        res.status(200).json(dlc);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

/* Update *************************************************************************************************************/
/**
 * @swagger
 * /api/dlcs/{id}:
 *   put:
 *     tags:
 *       - DLCs
 *     summary: Updates a DLC
 *     description: Updates a DLC from its id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The id of the DLC to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - game_id
 *               - name
 *               - price
 *             properties:
 *               game_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: The new name of my DLC
 *               description:
 *                 type: string
 *                 example: The new description of my DLC
 *               price:
 *                 type: number
 *                 example: 10.00
 *     responses:
 *       200:
 *         description: DLC updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 game_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       400:
 *         description: The id must be a positive integer. | At least one mandatory parameter is empty. | The id of the game must be a positive integer. | The name of the DLC cannot be longer than 100 characters. | The description of the DLC cannot be longer than 255 characters. | The price of the DLC must be a positive number, or zero.
 *       404:
 *         description: users not found
 *       500:
 *         description: Internal server error.
 */
dlcsRouter.put("/:id", auth, async (req, res) => {
    try {
        // Handling errors with the id parameter
        if (isNaN(req.params.id) || req.params.id < 1) {
            return res.status(400).json({error: "The id must be a positive integer."});
        }

        // Variables
        const columns = ["game_id", "name", "description", "price"];
        const {game_id, name, description, price} = req.body;
        const data = [game_id, name, description, price];

        // Error handling
        if (game_id == null || name == null || price == null) {
            return res.status(400).json({error: "At least one mandatory parameter is empty."});
        }

        if (isNaN(game_id) || game_id < 1) {
            return res.status(400).json({error: "The id of the game must be a positive integer."});
        }

        if (name.length > 100) {
            return res.status(400).json({error: "The name of the DLC cannot be longer than 100 characters."});
        }

        if (description.length > 255) {
            return res.status(400).json({error: "The description of the DLC cannot be longer than 255 " +
                    "characters."});
        }

        if (isNaN(price) || price < 0) {
            return res.status(400).json({error: "The price of the DLC must be a positive number, or zero."})
        }

        // Updating the entry
        const updatedDlc = await CRUD.updateInEntity("dlcs", req.params.id, columns, data);
        res.status(200).json(updatedDlc);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

/* Delete *************************************************************************************************************/
/**
 * @swagger
 * /api/dlcs/{id}:
 *   delete:
 *     tags:
 *       - DLCs
 *     summary: Deletes a DLC
 *     description: Deletes a DLC from database from its id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The id of the DLC to delete
 *     responses:
 *       204:
 *         description: DLC deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: dlc not found
 *       500:
 *         description: Internal server error
 */
dlcsRouter.delete("/:id", auth, async (req, res) => {
    try {
        // Handling errors with the id parameter
        if (isNaN(req.params.id) || req.params.id < 1) {
            return res.status(400).json({error: "The id must be a positive integer."});
        }

        // Deleting the entry
        await CRUD.deleteFromEntity("dlcs", req.params.id);
        res.status(204).json({message: "DLC deleted successfully"});
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

/***********************************************************************************************************************
 *  Exports
 **********************************************************************************************************************/
export default dlcsRouter;