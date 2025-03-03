import { Request, Response, NextFunction } from 'express';

// Error handler should have these 4 parameters
export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.send(error);
};
