import { Router } from 'express';
import chatRoutes from './chat.routes';
import messageRoutes from './mesage.routes';
import authRoutes from './auth.routes';

const mainRouter = Router();

mainRouter.use('/chat', chatRoutes);
mainRouter.use('/message', messageRoutes);
mainRouter.use('/auth', authRoutes);

export default mainRouter;