"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const userRoutes = (0, express_1.Router)();
const { userController } = controllers_1.default;
userRoutes.post("/:userId/add-contact", userController.addContact);
userRoutes.get("/:userId/get-nonAdded-contacts", userController.getNonAddedContacts);
userRoutes.get("/:userId/get-added-contacts", userController.getAddedContacts);
exports.default = userRoutes;
