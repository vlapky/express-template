import express from 'express';
import { products } from '../data';

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

// Not found routes
routes.use('*', (req, res) => {
  res.json({
    time: Date.now()
  });
});

export { routes };
