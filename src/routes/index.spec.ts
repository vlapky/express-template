import request from 'supertest';
import express from 'express';
import { routes } from './index';

const app = express();
app.use(routes);

const availableRoutes = [
  '/health',
  '/products',
  '/users',
  '/products/1',
  '/users/1',
];

describe('routes', () => {
  for (const route of availableRoutes) {
    it(`${route} should exist`, async () => {
      const res = await request(app).get(route);
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(res.statusCode).toBe(200);
      expect(res.text).not.toBe('');
    });
  }
});
