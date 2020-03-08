import { Document } from 'mongoose';

export interface Post extends Document {
    readonly text: string;
    readonly tags: string[];
    readonly imageUrl: string;
    // readonly user_id: string;
    readonly created_at: Date;
    readonly updated_at: Date;
}
