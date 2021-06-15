import { Handler, NextFunction, Request, Response } from 'express';


type PromiseHandler<T> = (req: Request, res: Response, next: NextFunction) => Promise<T>;

export default function wrap<T = unknown>(promiseHandler: PromiseHandler<T>): Handler {
  return (req, res, next) => {
    promiseHandler(req, res, next)
      .catch(next);
  };
}
