import {Router} from "express";
import {sessionMiddleware} from "../session/middleware.js";
import {getMyProfile} from "./handlers.js";

const router = Router();
router.use(sessionMiddleware);
router.get("/me", getMyProfile);

export {router};
