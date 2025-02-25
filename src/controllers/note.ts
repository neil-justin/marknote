import { NoteDoc, NoteQuery } from '@app/types';
import { NextFunction, Request, Response } from 'express';
import noteService from '@/services/note';

export const getNotes = async (
  req: Request<unknown, NoteDoc[], unknown, NoteQuery>,
  res: Response<NoteDoc[]>,
  next: NextFunction
) => {
  try {
    const notes = await noteService.getNotes(req.query);
    res.json(notes);
  } catch (error) {
    next(error);
  }
};
