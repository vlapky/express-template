import './env.setup';
import express from 'express';
import morgan from 'morgan';
import { routes } from './routes';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

app.use(routes);

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
