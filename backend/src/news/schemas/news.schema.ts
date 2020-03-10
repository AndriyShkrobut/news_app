import { Schema } from 'mongoose';

export const NewsSchema = new Schema(
    {
        text: String,
        tags: [String],
        imageUrl: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
        versionKey: false,
    },
);
