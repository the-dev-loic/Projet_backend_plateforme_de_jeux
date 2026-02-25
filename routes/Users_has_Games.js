/***********************************************************************************************************************
 * Program name :           Users_has_games.js
 * Description :            route for user has games table
 * Author :                 Loïc Roux
 * Creation date :          24.02.2026
 * Modified by :            -Loïc Roux
 * Modification date :      -25.02.2026
 * Version :                0.1.1
 **********************************************************************************************************************/
import express from 'express';
const router = express.Router();
import { CRUD } from "../database/database-connection.js";

/**
 * @swagger
 *
 * /api/Users_has_games:
 *   get:
 *     summary: have all  the middle table users_has_games
 *     description: we go find the table with only foreign key
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
 *  /api/Users_has_games/{id}:
 *   get:
 *     summary: have  the middle table users_has_games
 *     description: we go find the table with only foreign key
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
 *  */

router.get('/', async (req, res) => {
    let result = await CRUD.getAllFromEntity("users_has_games")
    res.json(result)
})
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try{
    let result = await CRUD.getFromEntityById("users_has_games",id)
    res.json(result)}
    catch (error){
        console.log("the id doesn't work")
        res.status(400).json({ error: "Erreur serveur" });
    }
})


export default router;