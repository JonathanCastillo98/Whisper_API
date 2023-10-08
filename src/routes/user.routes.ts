import { Router } from 'express';
import controllers from '../controllers';

const userRoutes = Router();

const { userController } = controllers;

userRoutes.post("/:userId/add-contact", userController.addContact);
userRoutes.get("/:userId/get-nonAdded-contacts", userController.getNonAddedContacts);
userRoutes.get("/:userId/get-added-contacts", userController.getAddedContacts);

export default userRoutes;