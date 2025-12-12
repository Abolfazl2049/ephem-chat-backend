import {Router} from "express";
import {router as sessionRouter} from "./services/session/router.js";
const router = Router();

router.use("/session", sessionRouter);

export {router};
