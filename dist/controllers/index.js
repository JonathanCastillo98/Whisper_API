"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_controller_1 = __importDefault(require("./chat.controller"));
const message_controller_1 = __importDefault(require("./message.controller"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const user_controller_1 = __importDefault(require("./user.controller"));
exports.default = {
    chatController: chat_controller_1.default,
    messageController: message_controller_1.default,
    authController: auth_controller_1.default,
    userController: user_controller_1.default,
};
