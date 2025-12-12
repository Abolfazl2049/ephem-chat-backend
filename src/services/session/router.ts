import {Router} from "express";
import {CreateSessionSchema} from "./schemas.js";
import {createSession} from "./handlers.js";
// import {applyLimiter} from "#src/libs/limiter/index.js";

const router = Router();

router.post("/create", CreateSessionSchema, createSession);
export {router};
