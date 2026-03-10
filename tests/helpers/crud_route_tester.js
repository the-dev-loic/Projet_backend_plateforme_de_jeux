/***********************************************************************************************************************
 * Program name :           crud_route_tester.js
 * Description :            helper for route unit test
 * Author :                 Cédric Jankiewicz
 * Creation date :          10.03.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1.0
 **********************************************************************************************************************/

import request from 'supertest';

export function testCrudRoutes(app, basePath, validBody, updateBody) {
    describe(`${basePath} CRUD`, () => {

        let createdId = 1;

        test("POST create", async () => {
            const res = await request(app).post(basePath).send(validBody);
            expect(res.statusCode).toBe(200);
        });

        test("POST invalid body", async () => {
            const res = await request(app).post(basePath).send({});
            expect(res.statusCode).toBe(400);
        });

        test("GET all", async () => {
            const res = await request(app).get(basePath);
            expect(res.statusCode).toBe(200);
        });

        test("GET by id", async () => {
            const res = await request(app).get(`${basePath}/${createdId}`);
            expect(res.statusCode).toBe(200);
        });

        test("GET invalid id", async () => {
            const res = await request(app).get(`${basePath}/-1`);
            expect(res.statusCode).toBe(400);
        });

        test("PUT update", async () => {
            const res = await request(app).put(`${basePath}/${createdId}`).send(updateBody);
            expect(res.statusCode).toBe(200);
        });

        test("DELETE", async () => {
            const res = await request(app).delete(`${basePath}/${createdId}`);
            expect(res.statusCode).toBe(200);
        });

    });
}