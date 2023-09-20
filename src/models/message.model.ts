import { Schema, Document, model, Types } from 'mongoose';

interface IMessage extends Document {
    sender: Types.ObjectId;
    content: string;
    chat: Types.ObjectId;
    direction: string;
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
            trim: true,
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: 'Chat',
        },
        direction: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default model<IMessage>('Message', messageSchema);
