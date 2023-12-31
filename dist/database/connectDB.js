"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const dbConfig_1 = __importDefault(require("./dbConfig"));
const environment = process.env.ENVIRONMENT === 'development' ? dbConfig_1.default.dev : dbConfig_1.default.test;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield mongoose_1.default.connect(`mongodb+srv://${environment.user}:${environment.pass}@${environment.host}/`);
    }
    catch (error) {
        console.error(error.message);
    }
});
exports.default = connectDB;
