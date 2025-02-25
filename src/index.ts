import express from 'express';
import userRouter from '@routes/user';
import { errorHandler } from '@util/middleware';

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);

app.get('/', (req, res, next) => {
  res.send('hello');
});

app.use(errorHandler);

export default app;
