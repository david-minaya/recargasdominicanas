import { NextFunction, Request, Response } from 'express';

export function timestamp() {
  return (req: Request, res: Response, next: NextFunction) => {
    req.date = new Date();
    next()
  };
}
