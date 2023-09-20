import Express, { Application } from "express";
import cors from "cors";
import mainRouter from "./routes";

const app: Application = Express();

app.use(Express.json());
app.use(cors());
app.use("/api/v1", mainRouter);

export default app;