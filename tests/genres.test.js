/***********************************************************************************************************************
 * Program name :           genres.test.js
 * Description :            unit test for the route genres
 * Author :                 Cédric Jankiewicz
 * Creation date :          11.03.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1.0
 **********************************************************************************************************************/

import app from "../app.js";
import { testCrudRoutes } from "./helpers/crud_route_tester.js";

describe("genres routes", () => {

    testCrudRoutes(
        app,
        "/api/genres",
        {
            name: "MNORPG"
        },
        {
            name: "MMORPG"
        }
    );

});