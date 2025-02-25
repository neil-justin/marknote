import express from 'express';
import { errorHandler } from '@util/middleware';

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('hello');
});

app.use(errorHandler);

export default app;
