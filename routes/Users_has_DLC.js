/***********************************************************************************************************************
 * Program name :           Users_has_DLC.js
 * Description :            route for user has dlcs table
 * Author :                 Loïc Roux
 * Creation date :          04.02.2026
 * Modified by :            -Loïc Roux
 * Modification date :      -04.03.2026
 * Version :                0.2.0
 **********************************************************************************************************************/
import express from 'express';
const router = express.Router();
import { CRUD } from "../database/database-connection.js";

/**
 * @swagger
 *
 * /api/Users_has_dlcs:
 *   get:
 *     summary: Get all entries from the middle table Users_has_dlcs
 *     description: Returns all rows from the junction table with only foreign keys
 *     responses:
 *       200:
 *         description: Successfully retrieved all entries
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a new entry in Users_has_dlcs
 *     description: Links a user to a game by inserting a new row in the junction table
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users_id:
 *                 type: integer
 *                 example: 1
 *               dlcs_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Entry successfully created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *
 * /api/Users_has_dlcs/{id}:
 *   get:
 *     summary: Get a single entry from Users_has_dlcs by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the entry
 *       400:
 *         description: Bad request
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update an entry in Users_has_dlcs by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users_id:
 *                 type: integer
 *                 example: 2
 *               dlcs _id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Entry successfully updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete an entry from Users_has_dlcs by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Entry successfully deleted
 *       400:
 *         description: Bad request
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */

// GET all
router.get('/', async (req, res) => {
    try {
        let result = await CRUD.getAllFromEntity("users_has_dlcs");
        res.json(result);
    } catch (error) {
        console.error("Error fetching all users_has_dlcs:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// GET by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID invalide" });
    }
    try {
        let result = await CRUD.getFromEntityById("users_has_dlcs", id);
        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Entrée non trouvée" });
        }
        res.json(result);
    } catch (error) {
        console.error("Error fetching users_has_dlcs by id:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// POST - create new entry
router.post('/', async (req, res) => {
    const { users_id, dlcs_id } = req.body;
    if (!users_id || !dlcs_id) {
        return res.status(400).json({ error: "users_id et dlcs_id sont requis" });
    }
    try {
        let result = await CRUD.createInEntity("users_has_dlcs", { users_id, dlcs_id });
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating users_has_dlcs entry:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

//  update
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID invalide" });
    }
    const { users_id, dlcs_id } = req.body;
    if (!users_id || !dlcs_id) {
        return res.status(400).json({ error: "users_id et dlcs_id sont requis" });
    }
    try {
        let result = await CRUD.updateInEntity("users_has_dlcs", id, { users_id, dlcs_id });
        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ error: "Entrée non trouvée" });
        }
        res.json(result);
    } catch (error) {
        console.error("Error updating users_has_dlcs entry:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID invalide" });
    }
    try {
        let result = await CRUD.deleteFromEntity("users_has_dlcs", id);
        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ error: "Entrée non trouvée" });
        }
        res.json({ message: "Entrée supprimée avec succès" });
    } catch (error) {
        console.error("Error deleting users_has_dlcs entry:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

export default router