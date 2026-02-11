/***********************************************************************************************************************
 * Program name :           app.js
 * Description :            Main app of the API
 * Author :                 Cédric Jankwevitch
 * Creation date :          04.02.2026
 * Modified by :            Loïc
 * Modification date :      11.02.2026
 * Version :                0.1.3
 **********************************************************************************************************************/
"use strict;";
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = 3000;

//  read JSON
app.use(express.json());

//  Config  Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mon API Node.js',
            version: '1.0.0',
            description: 'Documentation générée avec Swagger pour mon API Express',
            contact: {
                name: 'Développeur',
            },
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Serveur de développement',
            },
        ],
    },
    // read this file
    apis: ['./server.js'],
};

// Init swagger-jsdoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// routes swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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