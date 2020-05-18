import { Document } from 'mongoose';

export interface Token extends Document {
    readonly refreshToken: string;
    readonly expiresIn: number;
    readonly userId: string;
}
