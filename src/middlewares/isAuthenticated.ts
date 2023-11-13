import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string;

export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: "No authorization header" });
    }
    if (!authorization.startsWith("Bearer")) {
        return res.status(401).send({ error: "Invalid token" });
    }

    const splittedToken = authorization.split("Bearer ");
    if (splittedToken.length !== 2) {
        return res.status(401).send({ error: "Invalid token" });
    }

    const token = splittedToken[1];

    try {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) res.status(401).json("Invalid token");
            res.locals = {
                ...res.locals,
                user
            };
            return next();
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Error while trying to authenticate" });
    }
};