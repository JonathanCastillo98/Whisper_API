import { Router } from 'express';
import chatRoutes from './chat.routes';
import messageRoutes from './mesage.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const mainRouter = Router();

mainRouter.use('/chats', chatRoutes);
mainRouter.use('/messages', messageRoutes);
mainRouter.use('/auth', authRoutes);
mainRouter.use('/users', userRoutes);

export default mainRouter;