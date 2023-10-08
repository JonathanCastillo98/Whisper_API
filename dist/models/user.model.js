"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    status: {
        type: String,
        default: "Hey buddy, Whisper is amazing!"
    },
    contacts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('User', userSchema);
