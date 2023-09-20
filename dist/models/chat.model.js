"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define el esquema de chat
const chatSchema = new mongoose_1.Schema({
    chatName: {
        type: String,
        trim: true,
    },
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    users: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'User',
        },
    ],
    latestMessage: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Message', default: null,
    },
    groupAdmin: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    unreadCnt: {
        type: Number,
        default: 0,
    },
    liveChatStarted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Chat', chatSchema);
