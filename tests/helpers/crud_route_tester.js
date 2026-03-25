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

export function testCrudRoutes(
    app,
    basePath,
    validBody,
    updateBody,
    userCredentials = {
        username: 'testUser',
        password: '1234'
    }
) {
    describe(`${basePath} CRUD (with auth)`, () => {

        let token;
        let createdId;

        /* SETUP ***************************************************************************************************/
        beforeAll(async () => {

            // 1. Create user
            await request(app)
                .post('/api/signin')
                .send(userCredentials);

            // 2. Login → get token
            const res = await request(app)
                .post('/api/login')
                .send(userCredentials);

            token = res.body.token;

            if (!token) {
                throw new Error("Token not received from /api/login");
            }
        });

        const auth = (req) =>
            req.set('Authorization', `Bearer ${token}`);

        /* AUTH TESTS **********************************************************************************************/
        test("GET all → 401 without token", async () => {
            const res = await request(app).get(basePath);
            expect(res.statusCode).toBe(401);
        });

        test("GET all → 401 with invalid token", async () => {
            const res = await request(app)
                .get(basePath)
                .set('Authorization', 'Bearer fakeToken');

            expect(res.statusCode).toBe(401);
        });

        /* CRUD ***************************************************************************************************/

        test("POST create", async () => {
            const res = await auth(
                request(app).post(basePath).send(validBody)
            );

            expect(res.statusCode).toBe(201);
            createdId = res.body.id;
            expect(createdId).toBeDefined();
        });

        test("POST invalid body", async () => {
            const res = await auth(
                request(app).post(basePath).send({})
            );

            expect(res.statusCode).toBe(400);
        });

        test("GET all", async () => {
            const res = await auth(
                request(app).get(basePath)
            );

            expect(res.statusCode).toBe(200);
        });

        test("GET by id", async () => {
            const res = await auth(
                request(app).get(`${basePath}/${createdId}`)
            );

            expect(res.statusCode).toBe(200);
        });

        test("GET invalid id", async () => {
            const res = await auth(
                request(app).get(`${basePath}/-1`)
            );

            expect(res.statusCode).toBe(400);
        });

        test("PUT update", async () => {
            const res = await auth(
                request(app)
                    .put(`${basePath}/${createdId}`)
                    .send(updateBody)
            );

            expect(res.statusCode).toBe(200);
        });

        test("DELETE", async () => {
            const res = await auth(
                request(app)
                    .delete(`${basePath}/${createdId}`)
            );

            expect(res.statusCode).toBe(204);
        });

    });
}