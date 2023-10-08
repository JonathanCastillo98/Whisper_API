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
const chat_model_1 = __importDefault(require("../models/chat.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const chatController = {
    accessChat: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const { senderId, email } = req.body;
            if (!userId)
                return next((0, error_util_1.createError)(400, "Missing userId"));
            if (!senderId)
                return next((0, error_util_1.createError)(400, "Missing senderId"));
            ;
            let isChat = yield chat_model_1.default.find({
                $and: [{ isGroupChat: false }, { users: senderId }, { users: userId }],
            })
                .populate("users")
                .populate("latestMessage");
            isChat = yield user_model_1.default.populate(isChat, {
                path: "latestMessage.sender",
                select: "username email profilePhoto",
            });
            if (isChat.length > 0) {
                res.send(isChat[0]);
            }
            else {
                const chatData = {
                    chatName: email,
                    isGroupChat: false,
                    users: [senderId, userId],
                };
                try {
                    const createdChat = yield chat_model_1.default.create(chatData);
                    const fullChat = yield chat_model_1.default.findOne({ _id: createdChat._id }).populate("users");
                    res.status(200).send(fullChat);
                }
                catch (error) {
                    next(error);
                }
            }
        }
        catch (error) {
            next(error);
        }
    }),
    fetchChats: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            yield chat_model_1.default.find({ users: { $elemMatch: { $eq: userId } } })
                .populate("users")
                .populate("groupAdmin")
                .populate("latestMessage")
                .sort({ updatedAt: -1 })
                .then((result) => __awaiter(void 0, void 0, void 0, function* () {
                result = yield user_model_1.default.populate(result, {
                    path: "latestMessage.sender",
                    select: "username email profilePhoto",
                });
                res.status(200).send(result);
            }));
        }
        catch (error) {
            next(error);
        }
    }),
    getChat: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // try {
        //     const { chatId } = req.params;
        //     if (!chatId) return next(createError(400, "Missing chatId"));
        //     let chat = await Chat.find({
        //         _id: chatId,
        //     })
        //         .populate("users")
        //         .populate("latestMessage");
        //     if (!chat) return next(createError(404, "Chat not found"));
        //     return res.status(200).send(chat);
        // } catch (error) {
        //     next(error)
        // }
    }),
    updateUnreadCnt: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // const { chatId } = req.params;
        // const { newUnreadCnt } = req.body;
        // if (!chatId) return next(createError(400, "Missing chatId"));
        // try {
        //     let updatedChat;
        //     if (newUnreadCnt !== undefined) {
        //         updatedChat = await Chat.findByIdAndUpdate(
        //             chatId,
        //             { unreadCnt: newUnreadCnt },
        //             { new: true }
        //         ).exec();
        //     } else {
        //         updatedChat = await Chat.findByIdAndUpdate(
        //             chatId,
        //             { $inc: { unreadCnt: 1 } },
        //             { new: true }
        //         ).exec();
        //     }
        //     if (!updatedChat) {
        //         return next(createError(404, "Chat not found"));
        //     }
        //     return res
        //         .status(200)
        //         .send({ success: "Unread Cnt updated successfully!" });
        // } catch (error) {
        //     next(error)
        // }
    })
};
exports.default = chatController;
