import Express, { Application } from "express";
import cors from "cors";
import http, { Server } from "http";
import mainRouter from "./routes";
import setupSocket from "./utils/socket.util";

const app: Application = Express();
const server: Server = http.createServer(app);
setupSocket(server);

app.use(Express.json());
app.use(cors());
app.use("/api/v1", mainRouter);

export default server;