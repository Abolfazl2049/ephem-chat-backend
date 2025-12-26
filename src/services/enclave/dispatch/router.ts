import {paginationSchema} from "#src/services/shared/schema/pagination.js";
import {Router} from "express";
import {createDispatch, getDispatchesByEnclaveId} from "./handlers.js";
import {createDispatchSchema} from "./schema.js";

const router = Router();
router.get("/:enclaveId", paginationSchema, getDispatchesByEnclaveId);
router.post("/", createDispatchSchema, createDispatch);
export {router as dispatchRouter};
