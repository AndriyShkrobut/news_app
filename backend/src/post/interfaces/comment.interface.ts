import { Document } from 'mongoose';

export interface Comment extends Document {
    text: string;
    tags: string[];
    author: string;
    createdAt: Date;
    updatedAt: Date;
}
