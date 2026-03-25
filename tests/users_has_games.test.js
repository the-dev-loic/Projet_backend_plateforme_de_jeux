/***********************************************************************************************************************
 * Program name :           game_has_genres.test.js
 * Description :            unit test for the route games_has_genres
 * Author :                 Loïc Roux
 * Creation date :          25.03.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1.0
 **********************************************************************************************************************/

import app from "../app.js";
import { testCrudRoutes } from "./helpers/crud_route_tester.js";

describe("User_has_DLC routes", () => {

    testCrudRoutes(
        app,
        "/api/users_has_games",
        {
            user_id: 1,
            games_id: 2
        },
        {
            user_id: 1,
            games_id: 3
        }
    );

});