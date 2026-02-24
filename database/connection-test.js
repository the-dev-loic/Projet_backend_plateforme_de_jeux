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
import { CRUD } from "./database-connection.js";
/***********************************************************************************************************************
 *  Usage Examples
 **********************************************************************************************************************/
/* Creating a new entry in table `publishers` *************************************************************************/
let createTableName = 'publishers';
let createColumns = ['username', 'email', 'password'];
let createData = ['johndoe', 'john.doe@email.com', 'Password'];

let createTest = await CRUD.createInEntity(createTableName, createColumns, createData);
console.log(createTest);

/* Reading entries in table `publishers`, with a filter and a limit of entries | reading an entry with an Id **********/
let readTableName = "publishers";
let readColumn = 'username';
let readFilter = 'john';
let readLimit = 1
let readId = 3

let readTest = await CRUD.getAllFromEntity(readTableName, readColumn, readFilter, readLimit);
console.log(readTest);

let readWithIdTest = await CRUD.getFromEntityById(readTableName, readId);
console.log(readWithIdTest)

/* Updating an entry in table `publishers` ****************************************************************************/
let updateTable = 'publishers';
let updateId = 1;
let updateColumns = ['username', 'email', 'password'];
let updateData = ['janedoe', 'jane.doe@email.com', 'Pa$$w0rd'];

let updateTest = await CRUD.updateInEntity(updateTable, updateId, updateColumns, updateData);
console.log(updateTest)

/* Deleting an entry in table `publishers` ****************************************************************************/
let deleteTable = 'publishers';
let deleteId = 5;

let deleteTest = await CRUD.deleteFromEntity(deleteTable, deleteId);
console.log(deleteTest)