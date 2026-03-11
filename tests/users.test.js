/***********************************************************************************************************************
 * Program name :           users.test.js
 * Description :            unit test for the route users
 * Author :                 Cédric Jankiewicz
 * Creation date :          11.03.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1.0
 **********************************************************************************************************************/

import app from "../app.js";
import { testCrudRoutes } from "./helpers/crud_route_tester.js";

describe("users routes", () => {

    testCrudRoutes(
        app,
        "/api/users",
        {
            username: "p1",
            email: "pi@gmail.com",
            password: "password"
    },
        {
            username: "pie",
            email: "a@gmail.com",
            password: "Pa$$w0rd"
        }
    );

});