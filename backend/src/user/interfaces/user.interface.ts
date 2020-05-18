import { Document } from 'mongoose';

export interface User extends Document {
    readonly firstname: string;
    readonly lastname: string;
    readonly username: string;
    readonly email: string;
    readonly salt: string;
    readonly password: string;
    followers: string[];
    following: string[];
}
