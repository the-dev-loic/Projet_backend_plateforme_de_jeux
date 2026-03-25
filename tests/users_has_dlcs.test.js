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
        "/api/users_has_dlcs",
        {
            user_id: 1,
            DLC_id: 2
        },
        {
            user_id: 1,
            DLC_id: 3
        }
    );

});