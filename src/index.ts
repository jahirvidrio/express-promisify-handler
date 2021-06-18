import { Handler, NextFunction, Request, Response } from 'express';
import isPromise from 'p-is-promise';

type PromiseHandler<T> = (req: Request<any, any, any, any, any>, res: Response<any, any>, next: NextFunction) => Promise<T>;

export const promisify = <T = unknown>(handler: PromiseHandler<T>): Handler => (req, res, next) => {
  if (isPromise(handler)) return handler(req, res, next).catch(next);

  handler(req, res, next);
};
