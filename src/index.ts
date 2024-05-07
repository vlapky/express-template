import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import './env.setup';
import { routes } from './routes';

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

app.use(routes);

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
