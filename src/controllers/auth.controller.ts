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
            const existingUsername = await User.findOne({ username: username });
            const existingEmail = await User.findOne({ email: email });
            if (existingUsername) return next(createError(400, "Username already exists!"))
            if (existingEmail) return next(createError(400, "Email already exists!"))
            const saltRounds = 10; // Número de rondas de sal para bcrypt

            // Genera un hash de contraseña utilizando bcrypt
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Crea un nuevo usuario en MongoDB utilizando el modelo de usuario
            const newUser = new User({
                username: username,
                email: email,
                password: hashedPassword,
            });

            await newUser.save(); // Guarda el usuario en la base de datos
            const token = jwt.sign({ username, email }, JWT_SECRET)
            res.status(200).send(token);
        } catch (error) {
            next(error);
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user } = req.body
            const existingUser = await User.findOne({ $or: [{ username: user }, { email: user }] });

            if (!existingUser) return next(createError(404, "User not found."))

            const isPasswordCorrect = await bcrypt.compare(req.body.password, existingUser.password)
            if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"))


            const token = jwt.sign({ existingUser }, JWT_SECRET)

            res.status(200).send(token)
        } catch (error) {
            next(error)
        }
    },
}

export default authController;