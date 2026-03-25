/***********************************************************************************************************************
 * Program name :           users.test.js
 * Description :            unit test for the route users
 * Author :                 Gatien Clerc
 * Creation date :          17.03.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1.0
 **********************************************************************************************************************/

import app from "../app.js";
import { testCrudRoutes } from "./helpers/crud_route_tester.js";

describe("publishers routes", () => {

    testCrudRoutes(
        app,
        "/api/publishers",
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