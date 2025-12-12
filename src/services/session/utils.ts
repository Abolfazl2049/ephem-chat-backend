import {randomBytes} from "crypto";
import {Session} from "./entities.js";
import moment from "moment";
function generateSessionToken() {
  return randomBytes(32).toString("hex"); // 64-character token
}

function resetSessionExpiresAt(session: Session) {
  const remainingDays = moment(session.expiresAt).diff(new Date(), "days");

  if (remainingDays !== 29) {
    session.update({
      expiresAt: moment().add(30, "days").toDate()
    });
  }
}

export {generateSessionToken, resetSessionExpiresAt};
