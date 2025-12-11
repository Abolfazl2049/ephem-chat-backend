import {ErrorRequestHandler} from "express";
import {MyError} from "./model.js";
let errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    if (err instanceof MyError) {
      res.sendStatus(err.statusCode).send({
        message: err.message,
        data: err.data
      });
    } else {
      res.sendStatus(500).send(err.message ?? err);
    }
  }
};
export {errorHandler};
