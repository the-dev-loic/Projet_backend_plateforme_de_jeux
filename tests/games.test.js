/***********************************************************************************************************************
 * Program name :           game_has_genres.test.js
 * Description :            unit test for the route games_has_genres
 * Author :                 Cédric Jankiewicz
 * Creation date :          11.03.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1.0
 **********************************************************************************************************************/

import app from "../app.js";
import { testCrudRoutes } from "./helpers/crud_route_tester.js";

describe("games routes", () => {

    testCrudRoutes(
        app,
        "/api/games",
        {
            publisher_id: 2,
            name: "un jeux",
            description: "aaaaaaaaaaaaaaaaaaaaaaa",
            price: 10000
        },
        {
            publisher_id: 2,
            name: "un jeux",
            description: "aa",
            price: 1
        }
    );

});