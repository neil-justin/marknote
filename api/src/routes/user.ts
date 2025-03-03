import { saveUser } from '@controllers/user';
import express from 'express';

const router = express.Router();

router.post('/', saveUser);

export default router;
