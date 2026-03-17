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

export async function hashPassword(password, saltRounds) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err) {
        throw err;
    }
}

export async function verifyPassword(password, hashedPassword) {
    try {
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch (err) {
        throw err;
    }
}