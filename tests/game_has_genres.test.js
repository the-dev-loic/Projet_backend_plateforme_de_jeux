import { jest } from '@jest/globals';
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