import { Router } from 'express';
import controllers from '../controllers';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const messageRoutes = Router();

const { messageController } = controllers;

messageRoutes.post("/", isAuthenticated, messageController.sendMessage);
messageRoutes.get("/allChatMessages/:chatId", messageController.allMessages);

export default messageRoutes;
