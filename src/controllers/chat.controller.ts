import { NextFunction, Request, Response } from "express";
import { createError } from "../utils/error.util";
import Chat from "../models/chat.model";
import User from "../models/user.model";
import fs from "fs";
import Message from "../models/message.model";

const chatController = {
    accessChat: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params;
            const { senderId, email } = req.body;

            if (!userId) return next(createError(400, "Missing userId"));
            if (!senderId) return next(createError(400, "Missing senderId"));;

            let isChat = await Chat.find({
                $and: [{ isGroupChat: false }, { users: senderId }, { users: userId }],
            })
                .populate("users")
                .populate("latestMessage");

            isChat = await User.populate(isChat, {
                path: "latestMessage.sender",
                select: "username email profilePhoto",
            });

            if (isChat.length > 0) {
                res.send(isChat[0]);
            } else {
                const chatData = {
                    chatName: email,
                    isGroupChat: false,
                    users: [senderId, userId],
                };

                try {
                    const createdChat = await Chat.create(chatData);
                    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                        "users"
                    );
                    res.status(200).send(fullChat);
                } catch (error) {
                    next(error)
                }
            }
        } catch (error) {
            next(error)
        }
    },
    fetchChats: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params;
            await Chat.find({ users: { $elemMatch: { $eq: userId } } })
                .populate("users")
                .populate("groupAdmin")
                .populate("latestMessage")
                .sort({ updatedAt: -1 })
                .then(async (result) => {
                    result = await User.populate(result, {
                        path: "latestMessage.sender",
                        select: "username email profilePhoto",
                    });

                    res.status(200).send(result);
                });
        } catch (error) {
            next(error)
        }
    },
    getChat: async (req: Request, res: Response, next: NextFunction) => {
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
    },
    updateUnreadCnt: async (req: Request, res: Response, next: NextFunction) => {
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
    }
}
export default chatController;