import { Document } from 'mongoose';

export interface Post extends Document {
    readonly text: string;
    readonly tags: string[];
    readonly imageUrl: string;
    readonly author: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
