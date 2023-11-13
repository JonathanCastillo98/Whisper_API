import { Router } from 'express';
import controllers from '../controllers';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const chatRoutes = Router();

const { chatController } = controllers;

chatRoutes.post("/", isAuthenticated, chatController.accessChat);
chatRoutes.get("/", isAuthenticated, chatController.fetchChats);
// TODO: Put authentication middleware when the functions are working.
chatRoutes.get("/getChat/:chatId", chatController.getChat);
chatRoutes.put("/updateUnread/:chatId", chatController.updateUnreadCnt);


export default chatRoutes;
