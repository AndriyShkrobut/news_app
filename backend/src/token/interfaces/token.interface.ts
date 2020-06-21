import { Document } from 'mongoose';

export interface RefreshToken extends Document {
    readonly refreshToken: string;
    readonly expiresIn: number;
    readonly userId: string;
    readonly userAgent: string;
}
