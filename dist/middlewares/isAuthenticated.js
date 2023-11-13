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
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: "No authorization header" });
    }
    if (!authorization.startsWith("Bearer")) {
        return res.status(401).send({ error: "Invalid token" });
    }
    const splittedToken = authorization.split("Bearer ");
    if (splittedToken.length !== 2) {
        return res.status(401).send({ error: "Invalid token" });
    }
    const token = splittedToken[1];
    try {
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
            if (err)
                res.status(401).json("Invalid token");
            res.locals = Object.assign(Object.assign({}, res.locals), { user });
            return next();
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Error while trying to authenticate" });
    }
});
exports.isAuthenticated = isAuthenticated;
