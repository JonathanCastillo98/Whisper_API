import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/error.util";
import Message from "../models/message.model";
import User from "../models/user.model"
import Chat from "../models/chat.model";


const messageController = {
    sendMessage: async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = res.locals.user.existingUser;
        const { content, chatId } = req.body;

        if (!content || !chatId)
            return next(createError(400, "Invalid data passed into request"));
        if (!_id) return next(createError(400, "No senderId passed"));
        ;

        const newMessage = {
            sender: _id,
            content: content,
            chat: chatId,
        };

        try {
            let message = await Message.create(newMessage);
            message = await message.populate("sender", "username email profilePhoto");
            message = await message.populate("chat");
            message = await User.populate(message, {
                path: "chat.users",
                select: "username email profilePhoto",
            });

            await Chat.findByIdAndUpdate(chatId, {
                latestMessage: message,
            });

            return res.status(200).send(message);
        } catch (error) {
            next(error);
        }
    },
    allMessages: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { chatId } = req.params;
            const messages = await Message.find({ chat: chatId })
                .populate("sender", "username email profilePhoto")
                .populate("chat")
                .populate({
                    path: "chat",
                    populate: {
                        path: "users",
                        select: "username email profilePhoto",
                    },
                })

            return res.status(200).json(messages);
        } catch (error) {
            next(error)
        }
    }
}


export default messageController;
