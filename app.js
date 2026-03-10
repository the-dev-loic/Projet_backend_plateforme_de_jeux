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
import genresRouter from "./routes/genres.js";
import usersRouter from "./routes/users.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger.js";
import { gamesRouter } from "./routes/games.js"
import gamesHasGenresRouter from "./routes/games_has_genres.js"

/***********************************************************************************************************************
 *  Express
 **********************************************************************************************************************/
const app = express();
const port = 3000;

// read JSON
app.use(express.json());

/***********************************************************************************************************************
 *  Routes
 **********************************************************************************************************************/

// swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.get('/', (req, res) => {
    res.send('Welcome on the videogame plateform API');
});

/***********************************************************************************************************************
 *  Routers
 **********************************************************************************************************************/
app.use('/api/Games', gamesRouter);
app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter);
app.use('/api/games_has_genres', gamesHasGenresRouter);

// start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Documentation at http://localhost:${port}/api-docs`);
});

export default app; // Export the app for testing