import { Document } from 'mongoose';

export interface User extends Document {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    salt: string;
    password: string;
    followers: string[];
    following: string[];
}
