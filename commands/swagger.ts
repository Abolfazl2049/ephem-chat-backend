import {APP_PORT} from "#src/services/shared/constants/index.js";
import generateSwagger from "swagger-autogen";

// Create a sample response object
const responseJson = {
  ok: true,
  data: '#swagger.responses[200].schema.$ref = "#/definitions/ResponseSchema"'
};

const swaggerDocument = {
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

const doc = {
  swagger: "2.0",
  ...swaggerDocument
};

const swaggerFile = "../swagger_output.json";
const apiRouteFile = ["../src/router.ts"];

// Configure swagger-autogen to detect responses
const options = {
  openapi: "3.0.0",
  language: "en-US",
  disableLogs: false,
  autoHeaders: true,
  autoQuery: true,
  autoBody: true
};

generateSwagger(swaggerFile, apiRouteFile, doc);
