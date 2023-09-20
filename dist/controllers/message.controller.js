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
const error_util_1 = require("../utils/error.util");
const message_model_1 = __importDefault(require("../models/message.model"));
const chat_model_1 = __importDefault(require("../models/chat.model"));
const messageController = {
    sendMessage: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { content, chatId, senderId, direction } = req.body;
        if (!content || !chatId || !direction)
            return next((0, error_util_1.createError)(400, "Invalid data passed into request"));
        if (!senderId)
            return next((0, error_util_1.createError)(400, "No senderId passed"));
        ;
        const newMessage = {
            sender: senderId,
            content: content,
            chat: chatId,
            direction: direction,
        };
        try {
            let message = yield message_model_1.default.create(newMessage);
            message = yield message.populate("sender", "email picture");
            message = yield message.populate("chat");
            message = yield User.populate(message, {
                path: "chat.users",
                select: "email picture",
            });
            yield chat_model_1.default.findByIdAndUpdate(chatId, {
                latestMessage: message,
            });
            return res.status(200).send(message);
        }
        catch (error) {
            next(error);
            ;
        }
    }),
    allMessages: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { chatId } = req.params;
            const messages = yield message_model_1.default.find({ chat: chatId })
                .populate("sender", "email picture")
                .populate("chat");
            return res.status(200).json(messages);
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = messageController;
