import express from 'express';
import { products } from '../data';
import { verifyToken } from '../auth/jwt';

const routes = express.Router();

routes.post('/', async (req, res, next) => {
  await res.json(products);
});

routes.get('/', async (req, res, next) => {
  await res.json(products);
});

routes.get('/:id', (req, res) => {
  const id = req.params.id;
  let product = null;
  if (id) {
    product = products[parseInt(id)];
  }
  res.json(product);
});

export { routes };
