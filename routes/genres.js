/***********************************************************************************************************************
 * Program name :           app.js
 * Description :            Main app of the API
 * Author :                 Cédric Jankiewicz
 * Creation date :          24.02.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1.0
 **********************************************************************************************************************/
import express from 'express';
const router = express.Router();
import { CRUD } from "../database/database-connection.js";

router.get('/', async (req, res) => {
    let genres = await CRUD.getAllFromEntity("genres")
    res.json(genres)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let genres = await CRUD.getFromEntityById("genres", id);
    res.json(genres)
})

router.post('/', async (req, res) => {
    res.json(req.body);
    const data = Object.values(req.body);
    let response = await CRUD.createInEntity("genres", ['name'], data);
    res.json(response)
})

router.put('/:id', async (req, res) => {
    res.json(req.body);
    const data = Object.values(req.body);
    const id = parseInt(req.params.id);
    let response = await CRUD.updateInEntity("genres", id, ['name'], data)
    res.json(response)
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let response = await CRUD.deleteFromEntity("genres", id)
    res.json(response)
})

export default router;