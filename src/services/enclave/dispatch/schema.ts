import {checkSchema} from "express-validator";
const createDispatchSchema = checkSchema({
  enclaveId: {
    in: "body",
    isString: true,
    isUUID: true
  },
  content: {
    in: "body",
    isString: true,
    notEmpty: true
  }
});
export {createDispatchSchema};
