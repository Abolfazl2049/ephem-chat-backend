import cron from "node-cron";
import {deleteExpiredSessions} from "#services/session/cleanup.js";
import {deleteExpiredEnclaves} from "#src/services/enclave/utils.js";
import {keepAwake} from "#src/services/shared/utils/fetch.js";

// Run cleanup every day at 2 AM
cron.schedule("0 2 * * *", async () => {
  await deleteExpiredSessions();
  await deleteExpiredEnclaves();
});

// Send GET request every 10 minutes
cron.schedule("*/10 * * * *", async () => {
  await keepAwake();
});
