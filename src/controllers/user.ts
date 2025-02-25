import { User, UserDoc } from '@/types';
import { NextFunction, Request, Response } from 'express';
import userService from '@services/user';

export const saveUser = async (
  req: Request<unknown, UserDoc, User>,
  res: Response<UserDoc>,
  next: NextFunction
) => {
  try {
    const user = await userService.saveUser(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
