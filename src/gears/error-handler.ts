import {NextFunction, Request, Response} from "express";
let errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) res.sendStatus(500).send(err.message ?? err);
};
export {errorHandler};
