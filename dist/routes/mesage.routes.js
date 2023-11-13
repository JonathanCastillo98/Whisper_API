"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const messageRoutes = (0, express_1.Router)();
const { messageController } = controllers_1.default;
messageRoutes.post("/", isAuthenticated_1.isAuthenticated, messageController.sendMessage);
messageRoutes.get("/allChatMessages/:chatId", messageController.allMessages);
exports.default = messageRoutes;
