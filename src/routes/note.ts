import { createNote, getNotes, updateNote } from '@controllers/note';
import express from 'express';

const router = express.Router();

router.get('/', getNotes);
router.post('/:email', createNote);
router.put('/:id', updateNote);

export default router;
