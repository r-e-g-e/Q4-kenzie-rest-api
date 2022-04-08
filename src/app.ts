import "reflect-metadata";
import express from "express";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import routes from "./routes";
import connectDatabase from "./database";

const app = express();

connectDatabase();

app.use(express.json());
app.use(routes);
app.use(
  "/",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

export { app };
