import {
  createNote,
  getNotes,
  removeLabel,
  removeManyLabels,
  restoreNote,
  updateManyLabel,
  updateNote,
} from '@controllers/note';
import express from 'express';

const router = express.Router();

router.get('/', getNotes);
router.post('/:email', createNote);
router.put('/:id', updateNote);
// Deleting Note label
router.delete('/:id/labels/:label', removeLabel);
router.patch('/labels/:label', updateManyLabel);
router.delete('/labels/:label', removeManyLabels);
// This will delete Note document's trashedAt field
router.delete('/:id/fields/trashedAt', restoreNote);

export default router;
