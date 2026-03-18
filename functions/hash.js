/***********************************************************************************************************************
 * Program name :           hash.js
 * Description :            function to hash passwords
 * Author :                 Cédric Jankiewicz
 * Creation date :          17.03.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1.0
 **********************************************************************************************************************/
import bcrypt from 'bcrypt';

/**
 * hash a password
 * @param password the password to hash
 * @param saltRounds the salt to add
 * @returns {Promise}
 */
export async function hashPassword(password, saltRounds) {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        throw err;
    }
}

/**
 * verify if the hashed password
 * @param password the entered password
 * @param hashedPassword
 * @returns {Promise}
 */
export async function verifyPassword(password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
        throw err;
    }
}