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
const user_model_1 = __importDefault(require("../models/user.model"));
const chat_model_1 = __importDefault(require("../models/chat.model"));
const messageController = {
    sendMessage: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = res.locals.user.existingUser;
        const { content, chatId } = req.body;
        if (!content || !chatId)
            return next((0, error_util_1.createError)(400, "Invalid data passed into request"));
        if (!_id)
            return next((0, error_util_1.createError)(400, "No senderId passed"));
        ;
        const newMessage = {
            sender: _id,
            content: content,
            chat: chatId,
        };
        try {
            let message = yield message_model_1.default.create(newMessage);
            message = yield message.populate("sender", "username email profilePhoto");
            message = yield message.populate("chat");
            message = yield user_model_1.default.populate(message, {
                path: "chat.users",
                select: "username email profilePhoto",
            });
            yield chat_model_1.default.findByIdAndUpdate(chatId, {
                latestMessage: message,
            });
            return res.status(200).send(message);
        }
        catch (error) {
            next(error);
        }
    }),
    allMessages: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { chatId } = req.params;
            const messages = yield message_model_1.default.find({ chat: chatId })
                .populate("sender", "username email profilePhoto")
                .populate("chat")
                .populate({
                path: "chat",
                populate: {
                    path: "users",
                    select: "username email profilePhoto",
                },
            });
            return res.status(200).json(messages);
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = messageController;
