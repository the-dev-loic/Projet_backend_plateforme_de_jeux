/***********************************************************************************************************************
 * Program name :           game_has_genres.test.js
 * Description :            unit test for the route games_has_genres
 * Author :                 Cédric Jankiewicz
 * Creation date :          10.03.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1.0
 **********************************************************************************************************************/

import app from "../app.js";
import { testCrudRoutes } from "./helpers/crud_route_tester.js";

describe("User_has_DLC routes", () => {

    testCrudRoutes(
        app,
        "/api/User_hsa_DLC",
        {
            game_id: 1,
            genre_id: 1
        },
        {
            game_id: 1,
            genre_id: 3
        }
    );

});