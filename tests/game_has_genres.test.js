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

describe("games_has_genres routes", () => {

    testCrudRoutes(
        app,
        "/api/games_has_genres",
        {
            game_id: 1,
            genre_id: 2
        },
        {
            game_id: 1,
            genre_id: 3
        }
    );

});