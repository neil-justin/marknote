import { NoteDoc, NoteQuery, NoteReqBody } from '@app/types';
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

export const createNote = async (
  req: Request<{ email: string }, NoteDoc, NoteReqBody | undefined>,
  res: Response<NoteDoc>,
  next: NextFunction
) => {
  try {
    const note = await noteService.createNote(req.params.email, req.body);
    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (
  req: Request<{ id: string }, NoteDoc, NoteReqBody>,
  res: Response<NoteDoc>,
  next: NextFunction
) => {
  try {
    const note = await noteService.updateNote(req.params.id, req.body);
    res.json(note);
  } catch (error) {
    next(error);
  }
};
