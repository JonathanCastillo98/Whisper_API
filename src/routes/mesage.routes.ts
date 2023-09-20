import { Router } from 'express';
import controllers from '../controllers';

const messageRoutes = Router();

const { messageController } = controllers;

messageRoutes.post("/message", messageController.sendMessage);
messageRoutes.get("/message/:chatId", messageController.allMessages);

export default messageRoutes;
