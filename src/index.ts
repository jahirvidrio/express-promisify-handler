import { Handler, NextFunction, Request, Response } from 'express';


type PromiseHandler<T> = (req: Request<any, any, any, any, any>, res: Response<any, any>, next: NextFunction) => Promise<T>;

export default <T = unknown>(handler: PromiseHandler<T>): Handler => async (req, res, next) => {
  try { await handler(req, res, next); }
  catch (error) { next(error); }
};
