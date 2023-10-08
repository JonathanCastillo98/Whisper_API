import { Router } from 'express';
import controllers from '../controllers';

const chatRoutes = Router();

const { chatController } = controllers;

chatRoutes.post("/:userId", chatController.accessChat);
chatRoutes.get("/:userId", chatController.fetchChats);
chatRoutes.get("/getChat/:chatId", chatController.getChat);
chatRoutes.put("/updateUnread/:chatId", chatController.updateUnreadCnt);


export default chatRoutes;
