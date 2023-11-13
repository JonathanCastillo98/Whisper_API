import dotenv from "dotenv";
import server from "./app";
import connectDB from "./database/connectDB";
dotenv.config()

const PORT = <number><unknown>process.env.PORT ?? 3977;
const API_VERSION = <string>process.env.API_VERSION;

server.listen(PORT, () => {
    connectDB();
    console.log(`Base endpoint: http://localhost:${PORT}/api/${API_VERSION}`);
})