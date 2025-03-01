import { LabelParams, NoteDoc, NoteQuery, NoteReqBody } from '@app/types';
import { NextFunction, Request, Response } from 'express';
import noteService from '@/services/note';
import { UpdateResult } from 'mongoose';

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

export const removeLabel = async (
  req: Request<LabelParams>,
  res: Response<NoteDoc>,
  next: NextFunction
) => {
  try {
    const note = await noteService.removeLabel(req.params);
    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const updateManyLabel = async (
  req: Request<LabelParams, UpdateResult, { newLabel: string }>,
  res: Response<UpdateResult>,
  next: NextFunction
) => {
  try {
    const result = await noteService.updateManyLabel(req.params, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const removeManyLabels = async (
  req: Request<LabelParams>,
  res: Response<UpdateResult>,
  next: NextFunction
) => {
  try {
    const result = await noteService.removeManyLabels(req.params);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const restoreNote = async (
  req: Request<{ id: string }>,
  res: Response<NoteDoc>,
  next: NextFunction
) => {
  try {
    const note = await noteService.restoreNote(req.params);
    res.json(note);
  } catch (error) {
    next(error);
  }
};
