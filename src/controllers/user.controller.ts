import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/error.util";
import User, { IUser } from "../models/user.model"



const userController = {
    addContact: async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const { contactId } = req.body;

        try {
            const user: IUser | null = await User.findById(userId).exec();;
            if (!user) return next(createError(404, "User doesn't exist!"));

            const contact = await User.findById(contactId).exec();;
            if (!contact) return next(createError(404, "Contact doesn't exist!"));

            if (!user?.contacts?.includes(contactId.toString())) {
                user.contacts?.push(contactId.toString());
                await user.save();
                return res.status(200).send("Contact added to your list!");
            }
            else return next(createError(400, "Contact already exists!"));

        } catch (error) {
            next(error);
        }
    },
    getNonAddedContacts: async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        try {
            const user: IUser | null = await User.findById(userId).exec();
            if (!user) return next(createError(404, "User doesn't exist!"));

            // Obtén todos los usuarios que no están en la lista de contactos del usuario
            const nonContactUsers = await User.find({ _id: { $ne: userId, $nin: user.contacts } });
            return res.status(200).send(nonContactUsers);
        } catch (error) {
            next(error)
        }
    },
    getAddedContacts: async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        try {
            const user: IUser | null = await User.findById(userId).exec();
            if (!user) return next(createError(404, "User doesn't exist!"));

            await user.populate('contacts', 'username email profilePhoto status');

            return res.status(200).send(user.contacts);
        } catch (error) {
            next(error)
        }
    }
}


export default userController;
