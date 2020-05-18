import { Document } from 'mongoose';

export interface Post extends Document {
    readonly text: string;
    readonly tags: string[];
    readonly imagePath: string;
    readonly author: string;
    readonly comments: string[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
