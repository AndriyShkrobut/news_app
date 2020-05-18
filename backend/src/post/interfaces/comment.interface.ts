import { Document } from 'mongoose';

export interface Comment extends Document {
    readonly text: string;
    readonly tags: string[];
    readonly author: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
