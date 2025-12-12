import {ErrorRequestHandler} from "express";
import {MyError} from "./model.js";
let errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    if (err instanceof MyError) {
      res.status(err.statusCode).json({
        message: err.message,
        data: err.data
      });
    } else {
      res.status(500).json({
        message: err.message ?? "Internal Server Error",
        data: err
      });
    }
  }
};
export {errorHandler};
