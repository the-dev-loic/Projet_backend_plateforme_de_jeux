/***********************************************************************************************************************
 * Program name :           swagger.js
 * Description :            Swagger config
 * Author :                 Loïc Roux
 * Creation date :          11.02.2026
 * Modified by :
 * Modification date :
 * Version :                1.0.0
 **********************************************************************************************************************/
"use strict";
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API users',
            version: '1.0.0',
            description: 'documentation for API users',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'dev server',
            },
        ],
    },
    apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;