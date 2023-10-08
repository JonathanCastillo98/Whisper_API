"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const chatRoutes = (0, express_1.Router)();
const { chatController } = controllers_1.default;
chatRoutes.post("/:userId", chatController.accessChat);
chatRoutes.get("/:userId", chatController.fetchChats);
chatRoutes.get("/getChat/:chatId", chatController.getChat);
chatRoutes.put("/updateUnread/:chatId", chatController.updateUnreadCnt);
exports.default = chatRoutes;
