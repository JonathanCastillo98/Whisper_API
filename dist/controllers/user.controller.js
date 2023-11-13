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
const error_util_1 = require("../utils/error.util");
const user_model_1 = __importDefault(require("../models/user.model"));
const userController = {
    addContact: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { _id } = res.locals.user.existingUser;
        const { contactId } = req.body;
        try {
            const user = yield user_model_1.default.findById(_id).exec();
            ;
            if (!user)
                return next((0, error_util_1.createError)(404, "User doesn't exist!"));
            const contact = yield user_model_1.default.findById(contactId).exec();
            ;
            if (!contact)
                return next((0, error_util_1.createError)(404, "Contact doesn't exist!"));
            if (!((_a = user === null || user === void 0 ? void 0 : user.contacts) === null || _a === void 0 ? void 0 : _a.includes(contactId.toString()))) {
                (_b = user.contacts) === null || _b === void 0 ? void 0 : _b.push(contactId.toString());
                yield user.save();
                return res.status(200).send("Contact added to your list!");
            }
            else
                return next((0, error_util_1.createError)(400, "Contact alredy exists!"));
        }
        catch (error) {
            next(error);
        }
    }),
    getNonAddedContacts: (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = res.locals.user.existingUser;
        try {
            const user = yield user_model_1.default.findById(_id).exec();
            if (!user)
                return next((0, error_util_1.createError)(404, "User doesn't exist!"));
            const nonContactUsers = yield user_model_1.default.find({ _id: { $ne: _id, $nin: user.contacts } });
            return res.status(200).send(nonContactUsers);
        }
        catch (error) {
            next(error);
        }
    }),
    getAddedContacts: (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = res.locals.user.existingUser;
        try {
            const user = yield user_model_1.default.findById(_id).exec();
            if (!user)
                return next((0, error_util_1.createError)(404, "User doesn't exist!"));
            yield user.populate('contacts', 'username email profilePhoto status');
            return res.status(200).send(user.contacts);
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = userController;
