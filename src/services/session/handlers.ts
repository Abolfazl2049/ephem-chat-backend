import {RequestHandler} from "express";
import {Session} from "./entities.js";
import {SuccessResponse} from "#src/gears/response/sucess.model.js";
import {User} from "../user/entities.js";
import {generateSessionToken} from "./utils.js";

const createSession: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.create({name: req.body.name});
    const session = await Session.create({user: user.id, name: req.body.name, token: generateSessionToken()});
    res.status(201).json(new SuccessResponse({message: "Session created successfully", data: {session}}));
  } catch (error) {
    next(error);
  }
};
export {createSession};
