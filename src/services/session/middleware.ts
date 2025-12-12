import {RequestHandler} from "express";
import {Session} from "./entities.js";
import {resetSessionExpiresAt} from "./utils.js";

const sessionMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.replace("Session ", "");
    if (!token) {
      res.status(401).end();
      return;
    }

    const session = await Session.findOne({where: {token}});
    if (!session) {
      res.status(401).end();
      return;
    }
    resetSessionExpiresAt(session);

    req.user = session.user;
    next();
  } catch (error) {
    console.error("Session middleware error:", error);
    res.status(500).end();
  }
};
export {sessionMiddleware};
