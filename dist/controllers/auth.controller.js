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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_util_1 = require("../utils/error.util");
const user_model_1 = __importDefault(require("../models/user.model"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const authController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            const existingUsername = yield user_model_1.default.findOne({ username: username });
            const existingEmail = yield user_model_1.default.findOne({ email: email });
            if (existingUsername)
                return next((0, error_util_1.createError)(400, "Username already exists!"));
            if (existingEmail)
                return next((0, error_util_1.createError)(400, "Email already exists!"));
            const saltRounds = 10;
            const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
            const newUser = new user_model_1.default({
                username: username,
                email: email,
                password: hashedPassword,
            });
            yield newUser.save();
            const token = jsonwebtoken_1.default.sign({ _id: newUser._id, username, email }, JWT_SECRET);
            res.status(200).send(token);
        }
        catch (error) {
            next(error);
        }
    }),
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req.body;
            const existingUser = yield user_model_1.default.findOne({ $or: [{ username: user }, { email: user }] });
            if (!existingUser)
                return next((0, error_util_1.createError)(404, "User not found."));
            const isPasswordCorrect = yield bcryptjs_1.default.compare(req.body.password, existingUser.password);
            if (!isPasswordCorrect)
                return next((0, error_util_1.createError)(400, "Wrong password or username!"));
            const token = jsonwebtoken_1.default.sign({ existingUser }, JWT_SECRET);
            res.status(200).send(token);
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = authController;
