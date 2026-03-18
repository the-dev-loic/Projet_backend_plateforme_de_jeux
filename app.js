/***********************************************************************************************************************
 * Program name :           app.js
 * Description :            Main app of the API
 * Author :                 Cédric Jankiewicz
 * Creation date :          04.02.2026
 * Modified by :            Thierry Perroud
 * Modification date :      24.02.2026
 * Version :                0.1.4
 **********************************************************************************************************************/
"use strict";

/***********************************************************************************************************************
 *  Imports
 **********************************************************************************************************************/
import express from 'express';
import cors from 'cors'

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger.js";

import gamesRouter from "./routes/games.js";
import dlcsRouter from "./routes/dlcs.js";
import usersRouter from "./routes/users.js";
import genresRouter from "./routes/genres.js";
import gamesHasGenresRouter from "./routes/games_has_genres.js"
import User_has_Game from "./routes/users_has_games.js"
import User_has_DLC  from "./routes/users_has_dlcs.js"
import Publishers from "./routes/publishers.js";
import path from 'path';
import { fileURLToPath } from "url";

/***********************************************************************************************************************
 *  Express
 **********************************************************************************************************************/
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;
app.use('/front', express.static(path.join(__dirname, 'front')));
app.use(cors());

// read JSON
app.use(express.json());

/***********************************************************************************************************************
 *  Routes
 **********************************************************************************************************************/

// swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

/***********************************************************************************************************************
 *  Routers
 **********************************************************************************************************************/
app.use('/api/games', gamesRouter);
app.use('/api/dlcs', dlcsRouter);
app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter);
app.use('/api/games_has_genres', gamesHasGenresRouter);
app.use('/api/users_has_dlcs', User_has_DLC);
app.use('/api/users_has_games', User_has_Game);
app.use('/api/publishers', Publishers)

// start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Documentation at http://localhost:${port}/api-docs`);
});

export default app; // Export the app for testing