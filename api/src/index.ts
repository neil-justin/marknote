import express from 'express';
import userRouter from '@routes/user';
import noteRouter from '@routes/note';
import { errorHandler } from '@util/middleware';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res, next) => {
  res.send('hello');
});

app.use(errorHandler);

export default app;
