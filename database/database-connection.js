/***********************************************************************************************************************
 * Program name :           database/database-connection.js
 * Description :            Connects to the database and
 * Author :                 Thierry Perroud
 * Creation date :          11.02.2026
 * Modified by :            Thierry Perroud
 * Modification date :      12.02.2026
 * Version :                0.1.1
 **********************************************************************************************************************/
"use strict";

/***********************************************************************************************************************
 *  Imports
 **********************************************************************************************************************/
import mysql2 from "mysql2/promise";

/***********************************************************************************************************************
 *  Variables
 **********************************************************************************************************************/
// MySQL connection instance to the database
const connection = await mysql2.createConnection({
    host:       "localhost",
    user:       "ProgBack_API",                     // Needs to be configured
    password:   "1234",                     // Needs to be configured
    port:       3306,
    database:   "videogames_platform"
});

// Checks if connected to the database
connection.connect((err) => {
    if (err) {
        console.error("Impossible de se connecter à la base de données." +
            "\nMot de passe incorrecte ou base de donnée inexistante.");
        return;
    }
    console.log("Connecté à la base de données");
});

/***********************************************************************************************************************
 *  Functions
 **********************************************************************************************************************/
const CRUD = {
    /*******************************************************************************************************************
     *  Create
     ******************************************************************************************************************/
    createInEntity: async (table, columns, data) => {
        const columnList = columns.map(col => `${col}`).join(', ');  // for 3 columns: 'col1, col2, col3'
        const placeholders = data.map(() => '?').join(', ');  // for 3 pieces of data: '?, ?, ?'

        // Example query: INSERT INTO table (col1, col2, col3) VALUES ('val1', 'val2', 'val3')
        const [result] = await connection.query(`INSERT INTO ${table} (${columnList}) VALUES (${placeholders})`, data);
        return {id: result.insertId, data};
    },

    /*******************************************************************************************************************
     *  Read
     ******************************************************************************************************************/
    getAllFromEntity: async (table, column, filter, limit) => {
        let query = `SELECT * FROM ${table}`;                            // Selects everything
        if (column && filter) query += ` WHERE ${column} LIKE '%${filter}%'`;  // Adds a filter
        if (limit) query += ` LIMIT ${limit}`;                                 // Adds a limit

        // Example query: SELECT * FROM table WHERE column LIKE '%filter%' LIMIT 5
        const [rows] = await connection.query(query);
        return rows;
    },

    getFromEntityById: async (table, id) => {
        // Example query: SELECT * FROM table WHERE id = 1
        const [row] = await connection.query(`SELECT * FROM ${table} WHERE id = ${id}`);
        return row;
    },

    /*******************************************************************************************************************
     *  Update
     ******************************************************************************************************************/
    updateInEntity: async (table, id, columns, data) => {
        let setValues = columns.map(col => `${col} = ?`).join(', '); // For 2 columns: 'col1 = ?, col2 = ?'

        // Example query: UPDATE table SET col1 = val1, col2 = val2, col3 = val3
        await connection.query(`UPDATE ${table} SET ${setValues} WHERE id = ${id}`, data);
        return {id, data};
    },

    /*******************************************************************************************************************
     *  Delete
     ******************************************************************************************************************/
    deleteFromEntity: async (table, id) => {
        // Example query: DELETE FROM table WHERE id = 3
        await connection.query(`DELETE FROM ${table} WHERE id = ${id}`);
        return {success: true};
    }
}

/***********************************************************************************************************************
 *  Exports
 **********************************************************************************************************************/
export { CRUD };  // import { CRUD } from ./database/database-connection.js