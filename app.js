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
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger.js";
const app = express();
const port = 3000;

//  read JSON
app.use(express.json());


// routes swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes de l'API ---

/**
 * @openapi
 * /:
 * get:
 * summary: Message de bienvenue
 * responses:
 * 200:
 * description: Succès
 * content:
 * text/plain:
 * schema:
 * type: string
 * example: "Bienvenue sur l'API !"
 */
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API !');
});

/**
 * @openapi
 * /users:
 * get:
 * summary: Récupère la liste des utilisateurs
 * responses:
 * 200:
 * description: Liste des utilisateurs récupérée
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: integer
 * nom:
 * type: string
 */
app.get('/users', (req, res) => {
    res.json([
        { id: 1, nom: 'Alice' },
        { id: 2, nom: 'Bob' }
    ]);
});

// start server
app.listen(port, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${port}`);
    console.log(`📖 Documentation disponible sur http://localhost:${port}/api-docs`);
});