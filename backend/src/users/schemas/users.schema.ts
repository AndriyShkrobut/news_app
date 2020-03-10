import { Schema } from 'mongoose';

export const UsersSchema = new Schema({
    firstname: String,
    lastname: String,
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    salt: String,
    password: {
        type: String,
        required: true,
    },
});
