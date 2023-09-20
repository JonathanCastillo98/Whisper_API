import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import environments from "./dbConfig"
import { Environment } from "../utils/models.util"

const environment: Environment = process.env.ENVIRONMENT === 'development' ? environments.dev : environments.test;

const connectDB = async () => {
    try {
        return await mongoose.connect(
            `mongodb+srv://${environment.user}:${environment.pass}@${environment.host}/`
        );
    } catch (error) {
        console.error(error.message)
    }
}

export default connectDB;