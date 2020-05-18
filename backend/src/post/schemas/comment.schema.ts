import { Schema } from 'mongoose';

export const CommentSchema = new Schema(
    {
        text: String,
        tags: [String],
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
