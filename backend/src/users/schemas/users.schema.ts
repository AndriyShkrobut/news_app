import { Schema } from 'mongoose';

export const UsersSchema = new Schema(
    {
        firstname: String,
        lastname: String,
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
        versionKey: false,
    },
);
