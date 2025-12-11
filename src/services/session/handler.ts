import {RequestHandler} from "express";
import {Session} from "./entities.js";

const createSession: RequestHandler = (req, res, next) => {
  try {
    Session.create({user: req.user});
  } catch (error) {
    next(error);
  }
};
export {createSession};
