import {Router} from "express";
import {sessionMiddleware} from "../session/middleware.js";
import {paginationSchema} from "../shared/schema/pagination.js";
import {getMyEnclaves, getMyEnclavesById} from "./handlers.js";

const router = Router();
router.use(sessionMiddleware);

router.get("/me", paginationSchema, getMyEnclaves);
router.get("/:id", getMyEnclavesById);
export {router};
