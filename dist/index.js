"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const connectDB_1 = __importDefault(require("./database/connectDB"));
dotenv_1.default.config();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3977;
const API_VERSION = process.env.API_VERSION;
app_1.default.listen(PORT, () => {
    (0, connectDB_1.default)();
    console.log(`Base endpoint: http://localhost:${PORT}/api/${API_VERSION}`);
});
