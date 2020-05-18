import { Schema } from 'mongoose';

export const UserSchema = new Schema(
    {
        firstname: String,
        lastname: String,
        profileImagePath: String,
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            select: false,
        },
        salt: {
            type: String,
            select: false,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        timestamps: {
            createdAt: true,
        },
        versionKey: false,
    },
);
