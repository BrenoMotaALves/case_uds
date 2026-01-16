import * as request from 'supertest';
import { createTestingApp, disconnectDatabase, resetDatabase } from '../utils';

describe('Boards CRUD (e2e)', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  it('updates board name', async () => {
    const app = await createTestingApp();

    try {
      const createResponse = await request(app.getHttpServer())
        .post('/boards')
        .send({ name: 'Board A' })
        .expect(201);

      const boardId = createResponse.body.id;

      await request(app.getHttpServer())
        .put(`/boards/${boardId}`)
        .send({ name: 'Board A Updated' })
        .expect(200);

      const getResponse = await request(app.getHttpServer())
        .get(`/boards/${boardId}`)
        .expect(200);

      expect(getResponse.body.name).toBe('Board A Updated');
    } finally {
      await app.close();
    }
  });

  it('deletes board with columns and cards', async () => {
    const app = await createTestingApp();

    try {
      const createResponse = await request(app.getHttpServer())
        .post('/boards')
        .send({ name: 'Board To Delete' })
        .expect(201);

      const boardId = createResponse.body.id;
      const firstColumnId = createResponse.body.columns[0].id;

      await request(app.getHttpServer())
        .post(`/columns/${firstColumnId}/cards`)
        .send({ title: 'Card 1' })
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/boards/${boardId}`)
        .expect(204);

      await request(app.getHttpServer())
        .get(`/boards/${boardId}`)
        .expect(404);

      const listResponse = await request(app.getHttpServer())
        .get('/boards')
        .expect(200);

      const stillExists = listResponse.body.some((board: any) => board.id === boardId);
      expect(stillExists).toBe(false);
    } finally {
      await app.close();
    }
  });

  it('returns 404 when deleting missing board', async () => {
    const app = await createTestingApp();

    try {
      await request(app.getHttpServer())
        .delete('/boards/2aa2b21e-7ed6-4b84-9a32-8a0b139d6f23')
        .expect(404);
    } finally {
      await app.close();
    }
  });
});
