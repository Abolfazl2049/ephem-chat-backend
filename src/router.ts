import {Router} from "express";
import {router as sessionRouter} from "./services/session/router.js";
import {router as userRouter} from "./services/user/router.js";
import {router as enclaveRouter} from "./services/enclave/router.js";
const router = Router();

router.use("/session", sessionRouter);
router.use("/user", userRouter);
router.use("/enclave", enclaveRouter);

export {router};
