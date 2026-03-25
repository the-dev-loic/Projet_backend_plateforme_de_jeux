/***********************************************************************************************************************
 * Program name :           auth.js
 * Description :            Handles auth for routes
 * Author :                 Thierry Perroud
 * Creation date :          11.03.2026
 * Modified by :
 * Modification date :
 * Version :                0.1.0
 **********************************************************************************************************************/
"use strict";

/***********************************************************************************************************************
 *  Imports
 **********************************************************************************************************************/
import jwt from 'jsonwebtoken' ;
import { privateKey } from "./private_key.js";

/***********************************************************************************************************************
 *  Auth
 **********************************************************************************************************************/
const auth = (req, res, next) => {
    try {
        // Extracts the 2nd part of the header
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, privateKey); // Decodes the token with the private key, which looks like
        const userId = decodedToken.userId;                 // { userId: x, iat: y, exp: z }

        req.auth = {
            userId: userId
        };
        next();
    }
    catch(error) {
        res.status(401).json({error: "Not authenticated."})
    }
}

export default auth;