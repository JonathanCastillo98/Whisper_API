"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_routes_1 = __importDefault(require("./chat.routes"));
const mesage_routes_1 = __importDefault(require("./mesage.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const mainRouter = (0, express_1.Router)();
mainRouter.use('/chats', chat_routes_1.default);
mainRouter.use('/messages', mesage_routes_1.default);
mainRouter.use('/auth', auth_routes_1.default);
mainRouter.use('/users', user_routes_1.default);
exports.default = mainRouter;
