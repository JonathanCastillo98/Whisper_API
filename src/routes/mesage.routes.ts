import { Router } from 'express';
import controllers from '../controllers';

const messageRoutes = Router();

const { messageController } = controllers;

messageRoutes.post("/", messageController.sendMessage);
messageRoutes.get("/:chatId", messageController.allMessages);

export default messageRoutes;
