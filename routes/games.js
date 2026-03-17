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
*     summary: Crée un jeu
*     description: Crée un nouveau jeu dans la base de données
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
*         description: La nouveau jeu a été crée
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
*         description: Un ou plusieurs paramètres indispensables sont vides. | L'id de l'éditeur doit être un nombre entier positif. | Le nom du jeu ne peut pas dépasser 100 caractères. | la description du jeu ne doit pas dépasser les 255 caractères. | Le prix du jeu doit être un nombre positif.
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
 *     summary: Récupère tous les jeux
 *     description: Retourne la liste des jeux avec possibilité de filtrage et de limite
 *     parameters:
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *         description: La colonne à filtrer (optionnel, a besoin du filtre)
 *         exemple: name
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Le filtrage à appliquer à la colonne (optionnel, a besoin de la colonne)
*         exemple: Counter-Strike
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre maximum de résultats (optionnel)
 *         exemple: 3
 *     responses:
 *       200:
 *         description: Liste des jeux
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
 *     summary: Récupère un jeu avec un id
 *     description: Retourne un jeu à partir de son id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: L'id du jeu
 *         exemple: 1
 *     responses:
 *       201:
 *         description: Jeu retourné
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
 *         description: L'id doit être un nombre entier positif.
 *       404:
 *         description: Jeu non trouvé.
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
 *     summary: Met à jour un jeu
 *     description: Met à jour un jeu en fonction de son id
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
 *         description: Le jeu mis à jour
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
 *         description: Un ou plusieurs paramètres indispensables sont vides. | L'id de l'éditeur doit être un nombre entier positif. | Le nom du jeu ne peut pas dépasser 100 caractères. | la description du jeu ne doit pas dépasser les 255 caractères. | Le prix du jeu doit être un nombre positif ou zéro.
 *       404:
 *         description: users not found
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
 *     summary: Supprime un jeu
 *     description: Supprime un jeu de la base de données en fonction de son id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: L'id du jeu à supprimer
 *     responses:
 *       204:
 *         description: Jeu supprimé avec succès.
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