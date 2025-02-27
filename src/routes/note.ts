import {
  createNote,
  getNotes,
  removeLabel,
  updateNote,
} from '@controllers/note';
import express from 'express';

const router = express.Router();

router.get('/', getNotes);
router.post('/:email', createNote);
router.put('/:id', updateNote);
// Deleting Note label
router.delete('/:id/labels/:label', removeLabel);

export default router;
