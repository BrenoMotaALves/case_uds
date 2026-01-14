import * as request from 'supertest';
import { createTestingApp, disconnectDatabase, resetDatabase } from '../utils';

describe('Cards move (e2e)', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  it('moves card within same board and rejects cross-board move', async () => {
    const app = await createTestingApp();

    try {
      const boardAResponse = await request(app.getHttpServer())
        .post('/boards')
        .send({ name: 'Board A' })
        .expect(201);

      const boardBResponse = await request(app.getHttpServer())
        .post('/boards')
        .send({ name: 'Board B' })
        .expect(201);

      const boardAColumns = boardAResponse.body.columns;
      const boardBColumns = boardBResponse.body.columns;

      const colA1 = boardAColumns[0].id;
      const colA2 = boardAColumns[1].id;
      const colB1 = boardBColumns[0].id;

      const cardResponse = await request(app.getHttpServer())
        .post(`/columns/${colA1}/cards`)
        .send({ title: 'Card A1', description: 'Desc' })
        .expect(201);

      const cardId = cardResponse.body.id;

      await request(app.getHttpServer())
        .patch(`/cards/${cardId}/move`)
        .send({ newColumnId: colA2 })
        .expect(200);

      await request(app.getHttpServer())
        .patch(`/cards/${cardId}/move`)
        .send({ newColumnId: colB1 })
        .expect(422);

      const boardAAfter = await request(app.getHttpServer())
        .get(`/boards/${boardAResponse.body.id}`)
        .expect(200);

      const movedColumn = boardAAfter.body.columns.find((col: any) => col.id === colA2);
      expect(movedColumn.cards.some((card: any) => card.id === cardId)).toBe(true);
    } finally {
      await app.close();
    }
  });
});
