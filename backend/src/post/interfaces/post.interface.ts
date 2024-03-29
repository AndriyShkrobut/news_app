import { Document } from 'mongoose';

export interface Post extends Document {
    text: string;
    tags: string[];
    imagePath: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}
