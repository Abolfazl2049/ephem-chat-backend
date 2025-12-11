import {Router} from "express";
import {CreateSessionSchema} from "./schema.js";
import {createSession} from "./handler.js";

const router = Router();
router.post("/create", CreateSessionSchema, createSession);
