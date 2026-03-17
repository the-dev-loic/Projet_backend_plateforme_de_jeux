/***********************************************************************************************************************
 * Program name :           hash_test.js
 * Description :            test of hash function
 * Author :                 Cédric Jankiewicz
 * Creation date :          17.03.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1.0
 **********************************************************************************************************************/
import {hashPassword,verifyPassword} from "./hash.js";

const password = "Pa$$word"
const wrongPassword = "password"
const hashedPassword = await hashPassword(password, 10);
console.log(hashedPassword);
console.log(await verifyPassword(password, hashedPassword));
console.log(await verifyPassword(wrongPassword, hashedPassword));