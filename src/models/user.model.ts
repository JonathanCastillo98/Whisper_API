import { Schema, Document, model, Types } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    profilePhoto: string;
    status: string;
    contacts: Array<IUser['_id']> | Array<IUser> | null;
    password: string;
    createdAt: Date;
}

const userSchema = new Schema<IUser>(
    {
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
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default model<IUser>('User', userSchema);
