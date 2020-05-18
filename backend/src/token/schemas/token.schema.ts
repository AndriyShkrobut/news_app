import { Schema } from 'mongoose';

export const TokenSchema = new Schema(
    {
        refreshToken: { type: String, required: true },
        userAgent: { type: String, required: true },
        expiresIn: { type: Number, required: true },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        versionKey: false,
    },
);
