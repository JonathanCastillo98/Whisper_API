import { Schema, Document, model, Types } from 'mongoose';

interface IChat extends Document {
    chatName: string;
    isGroupChat: boolean;
    users: Types.ObjectId[];
    latestMessage: Types.ObjectId | null;
    groupAdmin: Types.ObjectId | null
    unreadCnt: number;
    liveChatStarted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Define el esquema de chat
const chatSchema = new Schema<IChat>(
    {
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
                type: Types.ObjectId,
                ref: 'User',
            },
        ],
        latestMessage: {
            type: Types.ObjectId,
            ref: 'Message', default: null,
        },
        groupAdmin: {
            type: Types.ObjectId,
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
    },
    {
        timestamps: true,
    }
);

export default model<IChat>('Chat', chatSchema);
