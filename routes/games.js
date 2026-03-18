/***********************************************************************************************************************
 * Program name :           games.js
 * Description :            router for the games CRUD routes
 * Author :                 Thierry Perroud
 * Creation date :          25.02.2026
 * Modified by :            Gatien Clerc
 * Modification date :      11.03.2026
 * Version :                0.1.6
 **********************************************************************************************************************/
"use strict";

/***********************************************************************************************************************
 *  Imports
 **********************************************************************************************************************/
import express from "express";
import { CRUD } from "../database/database-connection.js";

/***********************************************************************************************************************
 *  Routes
 **********************************************************************************************************************/
const gamesRouter = express.Router();  // Router for http://localhost:3000/api/Games

/* Create *************************************************************************************************************/

/**
* @swagger
* /api/games:
*   post:
*     tags:
*       - Games
*     summary: Create a game
*     description: Create a new game in the db
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - publisher_id
*               - name
*               - price
*             properties:
*               publisher_id:
*                 type: integer
*                 example: 1
*               name:
*                 type: string
*                 example: The name of my game
*               description:
*                 type: string
*                 example: The description of my game
*               price:
*                 type: number
*                 example: 15.00
*     responses:
*       201:
*         description: new game created
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                 publisher_id:
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
 *         description: Internal server error
 */
gamesRouter.post("/", async (req, res) => {
    try {
        // Variables
        const columns = ["publisher_id", "name", "description", "price"];
        const {publisher_id, name, description, price} = req.body;
        const data = [publisher_id, name, description, price];

        // Error handling
        if (publisher_id == null || name == null || price == null) {
            return res.status(400).json({error: "Un ou plusieurs paramètres indispensables sont vides."});
        }

        if (isNaN(publisher_id) || publisher_id < 1) {
            return res.status(400).json({error: "L'id de l'éditeur doit être un nombre entier positif."});
        }

        if (name.length > 100) {
            return res.status(400).json({error: "Le nom du jeu ne peut pas dépasser 100 caractères."});
        }

        if (description.length > 255) {
            return res.status(400).json({error: "La description du jeu ne peut pas dépasser 255 " +
                    "caractères."});
        }

        if (isNaN(price) || price < 0) {
            return res.status(400).json({error: "Le prix du jeu doit être un nombre positif ou zéro."})
        }

        //  Creating the entry
        const newGame = await CRUD.createInEntity("games", columns, data);
        res.status(201).json(newGame);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

/* Read ***************************************************************************************************************/
/**
 * @swagger
 * /api/games:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get all games
 *     description: return a game list
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
 *         description: List of game
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 publisher_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       400:
 *         description: Bad request
 *       404:
 *         description: Page not found
 *       500:
 *         description: Internal server error
 */
gamesRouter.get("/", async (req, res) => {
    try {
        // Variables
        const column = req.query.column;
        const filter = req.query.filter;
        const limit = parseInt(req.query.limit);

        // Reading the entries
        const allGames = await CRUD.getAllFromEntity("games", column, filter, limit);
        res.status(200).json(allGames);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get a game by id
 *     description: get a game by it's id id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Game id
 *         exemple: 1
 *     responses:
 *       200:
 *         description: Game returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 publisher_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       400:
 *         description: Bad request
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 */
gamesRouter.get("/:id", async (req, res) => {
    try {
        // Handling errors with the id parameter
        if (isNaN(req.params.id) || req.params.id < 1) {
            return res.status(400).json({error: "L'id doit être un nombre entier positif."})
        }

        // Reading the entry
        const game = await CRUD.getFromEntityById("games", req.params.id);

        // Error handling
        if (!game) {
            return res.status(404).json({error: "Jeu non trouvé."});
        }

        // sending the entry to user
        res.status(200).json(game);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

/* Update *************************************************************************************************************/
/**
 * @swagger
 * /api/games/{id}:
 *   put:
 *     tags:
 *       - Games
 *     summary: Update a game
 *     description: Update a game by it's id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The id of the game to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - publisher_id
 *               - name
 *               - price
 *             properties:
 *               publisher_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: The new name of my game
 *               description:
 *                 type: string
 *                 example: The new description of my game
 *               price:
 *                 type: number
 *                 example: 10.00
 *     responses:
 *       200:
 *         description: Updated the game
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 publisher_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       400:
 *         description: Bad request
 *       404:
 *         description: game not found
 *       500:
 *         description: Internal server error
 */
gamesRouter.put("/:id", async (req, res) => {
    try {
        // Handling errors with the id parameter
        if (isNaN(req.params.id) || req.params.id < 1) {
            return res.status(400).json({error: "L'id doit être un nombre entier positif."});
        }

        // Variables
        const columns = ["publisher_id", "name", "description", "price"];
        const {publisher_id, name, description, price} = req.body;
        const data = [publisher_id, name, description, price];

        // Error handling
        if (publisher_id == null || name == null || price == null) {
            return res.status(400).json({error: "Un ou plusieurs paramètres indispensables sont vides."});
        }

        if (isNaN(publisher_id) || publisher_id < 1) {
            return res.status(400).json({error: "L'id de l'éditeur doit être un nombre entier positif."});
        }

        if (name.length > 100) {
            return res.status(400).json({error: "Le nom du jeu ne peut pas dépasser 100 caractères."});
        }

        if (description.length > 255) {
            return res.status(400).json({error: "La description du jeu ne peut pas dépasser 255 " +
                    "caractères."});
        }

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({error: "Le prix du jeu doit être un nombre positif ou zéro."})
        }

        // Updating the entry
        const updatedGame = await CRUD.updateInEntity("games", req.params.id, columns, data);
        res.status(200).json(updatedGame);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

/* Delete *************************************************************************************************************/
/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     tags:
 *       - Games
 *     summary: Delete a game
 *     description: delete a game by it's id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Game id
 *     responses:
 *       204:
 *         description: Deleted game
 *       400:
 *           description: Bad request
 *       404:
 *         description: users not found
 *       500:
 *         description: Internal server error
 */
gamesRouter.delete("/:id", async (req, res) => {
    try {
        // Handling errors with the id parameter
        if (isNaN(req.params.id) || req.params.id < 1) {
            return res.status(400).json({error: "L'id doit être un nombre entier positif."});
        }

        // Deleting the entry
        await CRUD.deleteFromEntity("games", req.params.id);
        res.status(204).json({message: "Jeu supprimé avec succès."});
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
});

/***********************************************************************************************************************
 *  Exports
 **********************************************************************************************************************/
export default gamesRouter;