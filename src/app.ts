import "dotenv/config";
import express from "express";
import http from "http";
import sequelize from "./libs/sequelize/index.js";
import cors from "cors";
import {errorHandler} from "./gears/error/error-handler.js";
import {router} from "./router.js";
import swaggerUi from "swagger-ui-express";
import {admin, adminRouter} from "./libs/adminjs/index.js";
import {applyLimiter} from "./libs/limiter/index.js";
import routeProtector from "./gears/route-protector.js";
import {requestLogger} from "./gears/logger.js";
import {APP_PORT} from "./services/shared/constants/index.js";
import "./libs/cron/index.js";
import {initSocketIO} from "./services/socket/app.js";

const app = express();
const server = http.createServer(app);
const swaggerJsonFilePath = await import("../swagger_output.json", {
  with: {type: "json"}
});

// adminsjs setup
app.use(admin.options.rootPath, adminRouter);

//  app basic settings
app.use(applyLimiter());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// static files
app.use(express.static("public"));

//swagger route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFilePath.default || swaggerJsonFilePath));

// custom middlewares
app.use(routeProtector);
app.use(requestLogger);

// app router
app.use(router);

// error handler
app.use(errorHandler);

// initialize socket.io
initSocketIO(server);

// app listen
server.listen(APP_PORT, () => {
  sequelize
    .sync({force: false})
    .then(() => {
      console.log(`http://localhost:${APP_PORT}`);
    })
    .catch(err => {
      console.log("err", err);
    });
});
export {app, server};
export default {app, server};
