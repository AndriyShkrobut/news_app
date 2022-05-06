import { Schema } from 'mongoose';

export const PostSchema = new Schema(
    {
        text: String,
        tags: [String],
        imagePath: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
        versionKey: false,
    },
);
