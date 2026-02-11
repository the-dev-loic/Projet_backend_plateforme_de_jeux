/***********************************************************************************************************************
 * Program name :           app.js
 * Description :            Main app of the API
 * Author :                 Cédric Jankiewicz
 * Creation date :          04.02.2026
 * Modified by :            Gatien Clerc
 * Modification date :      11.02.2026
 * Version :                0.1.2
 **********************************************************************************************************************/
"use strict;";

/*IMPORT*/
import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// create variable
const app = express()
const port = 3000

app.use(express.json());

//route home
app.get('/', (req, res) => {
    res.send('Hello World! Bivenue sur mon serveur')
})

app.get('/api',(req, res) => {
    res.redirect(`http://localhost:${port}/`)
})

// Configuring Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Activités Sportives',
            version: '1.0.0',
            description: 'Documentation de notre API pour gérer les activités',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur de développement',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
    console.log(' Documentation : http://localhost:3000/api-docs');
});

//app.use('/routes/*', routeur);


app.use((err,req, res, next) => {
    res.status(404).json({
        error: "No found",
        message:"No such route found",
        status:"error 404"
    });
})


// Lancement du serveur
app.listen(port, () => {
    console.log(`the serveur is running on port ${port}`);
});