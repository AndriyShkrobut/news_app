import { Schema } from 'mongoose';

export const LikeSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: true,
        },
        versionKey: false,
    },
);
