import { Schema } from 'mongoose';

export const NewsSchema = new Schema(
    {
        text: String,
        tags: [String],
        imageUrl: String,
        /* user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }, */
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        versionKey: false,
    },
);
