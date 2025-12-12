import {randomBytes} from "crypto";

function generateSessionToken() {
  return randomBytes(32).toString("hex"); // 64-character token
}
export {generateSessionToken};
