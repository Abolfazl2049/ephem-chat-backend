import {User} from "../user/entities.js";
import {Enclave} from "./entities.js";
import {addUserToEnclave} from "./utils.js";

async function createEnclave(users: User[]) {
  const enclave = Enclave.build({});
  for (const user of users) {
    addUserToEnclave(enclave, user);
  }
  await enclave.save();
  return enclave;
}
export {createEnclave};
