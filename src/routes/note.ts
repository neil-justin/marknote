import { createNote, getNotes } from '@controllers/note';
import express from 'express';

const router = express.Router();

router.get('/', getNotes);
router.post('/:email', createNote);

export default router;
