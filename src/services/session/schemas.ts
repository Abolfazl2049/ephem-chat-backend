import {checkSchema} from "express-validator";
const CreateSessionSchema = checkSchema({
  name: {
    in: "body",
    isString: true
  }
});

export {CreateSessionSchema};
