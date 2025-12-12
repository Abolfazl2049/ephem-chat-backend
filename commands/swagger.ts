import {APP_PORT} from "#src/services/shared/constants/index.js";
import generateSwagger from "swagger-autogen";

const swaggerData = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Ephem Chat Backend",
    description: "API documentation for Ephem Chat Backend"
  },
  host: `localhost:${APP_PORT}`,
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  autoBody: true,
  autoHeaders: true,
  autoQuery: true,
  autoResponse: true,
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Enter your bearer token in the format: Bearer <token>"
    }
  },
  security: [
    {
      Bearer: []
    }
  ]
};
const swaggerFile = "../swagger_output.json";
const apiRouteFile = ["../src/router.ts"];

generateSwagger(swaggerFile, apiRouteFile, swaggerData);
