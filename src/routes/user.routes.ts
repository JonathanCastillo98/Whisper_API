import { Router } from 'express';
import controllers from '../controllers';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const userRoutes = Router();

const { userController } = controllers;

userRoutes.post("/addContact", isAuthenticated, userController.addContact);
userRoutes.get("/notAddedContacts", isAuthenticated, userController.getNonAddedContacts);
userRoutes.get("/addedContacts", isAuthenticated, userController.getAddedContacts);

export default userRoutes;