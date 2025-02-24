import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('hello');
});

export default app;
