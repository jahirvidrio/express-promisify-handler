import { Handler, NextFunction, Request, Response } from 'express';


export default (handler: <S = Request, T = Response, U = NextFunction, V = unknown>(req: S, res: T, next: U) => Promise<V>): Handler => (req, res, next) => {
  handler(req, res, next)
    .catch(next);
};
