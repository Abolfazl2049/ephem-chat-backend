import "dotenv/config";
import express from "express";
import sequelize from "./libs/sequelize/index.js";
import cors from "cors";
import {errorHandler} from "./gears/error-handler.js";
import {appRouter} from "./router.js";
import swaggerUi from "swagger-ui-express";
import {admin, adminRouter} from "./libs/adminjs/index.js";
import {applyLimiter} from "./libs/limiter/index.js";
import routeProtector from "./gears/route-protector.js";
import {requestLogger} from "./gears/logger.js";
import {APP_PORT} from "./services/shared/constants/index.js";
const app = express();
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
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFilePath));

// custom middlewares
app.use(routeProtector);
app.use(requestLogger);

// app router
app.use(appRouter);

// error handler
app.use(errorHandler);

// app listen
app.listen(APP_PORT, () => {
  sequelize
    .sync({force: false})
    .then(() => {
      console.log(`http://localhost:${APP_PORT}`);
    })
    .catch(err => {
      console.log("err", err);
    });
});
