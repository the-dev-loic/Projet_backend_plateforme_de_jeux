/***********************************************************************************************************************
 * Program name :           app.js
 * Description :            Main app of the API
 * Author :                 Cédric Jankiewicz
 * Creation date :          04.02.2026
 * Modified by :            Loïc Roux
 * Modification date :      11.02.2026
 * Version :                0.1.3
 **********************************************************************************************************************/
"use strict";

import express from 'express';
import genresRouter from "./routes/genres.js";
import usersRouter from "./routes/users.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger.js";
const app = express();
const port = 3000;

// read JSON
app.use(express.json());


// swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.get('/', (req, res) => {
    res.send('Welcome on the videogame plateform API');
});

// router
app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter);

// start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Documentation at http://localhost:${port}/api-docs`);
});