/***********************************************************************************************************************
 * Program name :           app.js
 * Description :            Main app of the API
 * Author :                 Cédric Jankiewicz
 * Creation date :          04.02.2026
 * Modified by :            Thierry Perroud
 * Modification date :      25.03.2026
 * Version :                0.1.5
 **********************************************************************************************************************/
"use strict";

/***********************************************************************************************************************
 *  Imports
 **********************************************************************************************************************/
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger.js";

import apiUsersRouter from "./routes/api_users.js"
import gamesRouter from "./routes/games.js";
import dlcsRouter from "./routes/dlcs.js";
import usersRouter from "./routes/users.js";
import genresRouter from "./routes/genres.js";
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
app.use('/api', apiUsersRouter);
app.use('/api/games', gamesRouter);
app.use('/api/dlcs', dlcsRouter);
app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter);
app.use('/api/games_has_genres', gamesHasGenresRouter);

// start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Documentation at http://localhost:${port}/api-docs`);
});

export default app; // Export the app for testing