import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from "../utils/error.util";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET as string;

const authController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { password } = req.body;
            const saltRounds = 10; // Número de rondas de sal para bcrypt

            // Genera un hash de contraseña utilizando bcrypt
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Crea un nuevo usuario en MongoDB utilizando el modelo de usuario
            const newUser = new User({
                ...req.body,
                password: hashedPassword,
            });

            await newUser.save(); // Guarda el usuario en la base de datos

            res.status(200).json("User has been created.");
        } catch (error) {
            next(error);
        }
    },
    // login: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const user = await User.findOne({
    //             attributes: ["id", "username", "email", "country", "img", "city", "phone", "role", "isAdmin", "password"],
    //             where: {
    //                 username: req.body.username
    //             }
    //         })

    //         if (!user) return next(createError(404, "User not found."))

    //         const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    //         if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"))


    //         const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin, email: user.email }, JWT_SECRET)

    //         const { password, isAdmin, ...otherDeatils } = user.dataValues;

    //         res.status(200).json({ ...otherDeatils, token })
    //     } catch (error) {
    //         next(error)
    //     }
    // },
}

export default authController;