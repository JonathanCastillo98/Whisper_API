"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const JWT_SECRET = process.env.JWT_SECRET;
const authController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password } = req.body;
            const saltRounds = 10; // Número de rondas de sal para bcrypt
            // Genera un hash de contraseña utilizando bcrypt
            const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
            // Crea un nuevo usuario en MongoDB utilizando el modelo de usuario
            const newUser = new user_model_1.default(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
            yield newUser.save(); // Guarda el usuario en la base de datos
            res.status(200).json("User has been created.");
        }
        catch (error) {
            next(error);
        }
    }),
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
};
exports.default = authController;
