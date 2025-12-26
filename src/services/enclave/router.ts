import {Router} from "express";
import {sessionMiddleware} from "../session/middleware.js";
import {paginationSchema} from "../shared/schema/pagination.js";
import {getMyEnclaves, getMyEnclaveById} from "./handlers.js";
import {dispatchRouter} from "./dispatch/router.js";

const router = Router();
router.use(sessionMiddleware);

router.get("/me", paginationSchema, getMyEnclaves);
router.get("/:id", getMyEnclaveById);
router.use("/dispatch", dispatchRouter);

export {router};
