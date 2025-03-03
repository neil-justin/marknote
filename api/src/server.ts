import app from './index.ts';
import { PORT } from '@util/config.ts';
import connectToDB from '@util/db.ts';

const startServer = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log('Express app is listening on PORT ', PORT);
  });
};

startServer();
