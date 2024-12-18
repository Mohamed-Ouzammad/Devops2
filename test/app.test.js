const request = require('supertest');
const app = require('../server');
const { beforeAll, afterAll, describe, it, expect } = require('@jest/globals');

let server;

beforeAll((done) => {
    server = app.listen(3001, () => done());
});

afterAll((done) => {
    server.close(done);
});

describe("TodoList API Tests", () => {
    it('Devrait retourner une liste vide au départ', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks).toEqual([]);
    });

    it('Devrait ajouter une nouvelle tâche', async () => {
        const newTask = { id: 0, text: 'Tâche de test' };

        const response = await request(app)
            .post('/add-task')
            .send({ task: newTask });

        expect(response.statusCode).toBe(201);
        expect(response.body.tasks).toEqual(
            expect.arrayContaining([newTask])
        );
    });

    it('Devrait supprimer une tâche existante', async () => {
        await request(app)
            .post('/add-task')
            .send({ task: { id: 0, text: 'Tâche de test' } });

        const deleteResponse = await request(app)
            .delete('/delete-task')
            .send({ id: 0 });

        expect(deleteResponse.statusCode).toBe(200);

        const tasksAfterDeletion = deleteResponse.body.tasks;

        expect(tasksAfterDeletion).not.toContainEqual({ id: 0, text: 'Tâche de test' });
    });
});
