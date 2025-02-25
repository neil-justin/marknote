import express from 'express';
import userRouter from '@routes/user';
import noteRouter from '@routes/note';
import { errorHandler } from '@util/middleware';

const app = express();

app.use(express.json());

app.use('/api/notes', noteRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res, next) => {
  res.send('hello');
});

app.use(errorHandler);

export default app;
