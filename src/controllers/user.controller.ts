import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/error.util";
import User, { IUser } from "../models/user.model"



const userController = {
    addContact: async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = res.locals.user.existingUser;
        const { contactId } = req.body;

        try {
            const user: IUser | null = await User.findById(_id).exec();;
            if (!user) return next(createError(404, "User doesn't exist!"));

            const contact = await User.findById(contactId).exec();;
            if (!contact) return next(createError(404, "Contact doesn't exist!"));

            if (!user?.contacts?.includes(contactId.toString())) {
                user.contacts?.push(contactId.toString());
                await user.save();
                return res.status(200).send("Contact added to your list!");
            }
            else return next(createError(400, "Contact alredy exists!"));

        } catch (error) {
            next(error);
        }
    },
    getNonAddedContacts: async (_req: Request, res: Response, next: NextFunction) => {
        const { _id } = res.locals.user.existingUser;
        try {
            const user: IUser | null = await User.findById(_id).exec();
            if (!user) return next(createError(404, "User doesn't exist!"));

            const nonContactUsers = await User.find({ _id: { $ne: _id, $nin: user.contacts } });
            return res.status(200).send(nonContactUsers);
        } catch (error) {
            next(error)
        }
    },
    getAddedContacts: async (_req: Request, res: Response, next: NextFunction) => {
        const { _id } = res.locals.user.existingUser;
        try {
            const user: IUser | null = await User.findById(_id).exec();
            if (!user) return next(createError(404, "User doesn't exist!"));

            await user.populate('contacts', 'username email profilePhoto status');

            return res.status(200).send(user.contacts);
        } catch (error) {
            next(error)
        }
    },
}


export default userController;
