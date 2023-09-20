import { Router } from 'express';
import controllers from '../controllers';

const chatRoutes = Router();

const { chatController } = controllers;

chatRoutes.post("/chat", chatController.accessChat);
chatRoutes.post("/getChats", chatController.fetchChats);
chatRoutes.get("/getchat/:chatId", chatController.getChat);
chatRoutes.put("/updateUnread/:chatId", chatController.updateUnreadCnt);


export default chatRoutes;
