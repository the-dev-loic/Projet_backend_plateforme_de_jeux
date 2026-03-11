/***********************************************************************************************************************
 * Program name :           dlcs.test.js
 * Description :            unit test for the route games_has_genres
 * Author :                 Cédric Jankiewicz
 * Creation date :          11.03.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1.0
 **********************************************************************************************************************/

import app from "../app.js";
import { testCrudRoutes } from "./helpers/crud_route_tester.js";

describe("dlcs routes", () => {

    testCrudRoutes(
        app,
        "/api/dlcs",
        {
            "game_id": 2,
            "name": "The name of my DLC",
            "description": "The description of my DLC",
            "price": 15
        },
        {
            "game_id": 2,
            "name": "The name of my DLC",
            "description": "The description of my DLC",
            "price": 5
        }
    );

});