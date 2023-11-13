import dotenv from 'dotenv'
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from "../utils/error.util";
import User from "../models/user.model";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string;

const authController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, email, password } = req.body;

            const usernameExists = await User.findOne({ username: username });
            const emailExists = await User.findOne({ email: email });

            if (usernameExists) return next(createError(400, "Username already exists!"));
            if (emailExists) return next(createError(400, "Email already exists!"));

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                username: username,
                email: email,
                password: hashedPassword,
            });

            await newUser.save();
            const token = jwt.sign({ _id: newUser._id, username, email }, JWT_SECRET)
            res.status(200).send(token);
        } catch (error) {
            next(error);
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user, password } = req.body
            const existingUser = await User.findOne({ $or: [{ username: user }, { email: user }] });

            if (!existingUser) return next(createError(404, "User not found."))

            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordCorrect) return next(createError(400, "Wrong password!"))


            const accessToken = jwt.sign({ ...existingUser }, JWT_SECRET);

            res.status(200).json({
                username: existingUser.username,
                email: existingUser.email,
                profilePhoto: existingUser.profilePhoto,
                status: existingUser.status,
                contacts: existingUser.contacts,
                creationDate: existingUser.createdAt,
                accessToken,
            })
        } catch (error) {
            next(error)
        }
    },
}

export default authController;