import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';

import { User } from './interfaces/user.interface';
import { UserDataDTO } from './dtos/user-data.dto';
import { SignUpUserDTO } from './dtos/sign-up-user.dto';
import { SignInUserDTO } from './dtos/sign-in-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async createUser(createUserDTO: SignUpUserDTO): Promise<User> {
        const { password } = createUserDTO;

        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);

        const userData = {
            ...createUserDTO,
            password: hashedPassword,
            salt,
        };

        const userToCreate = new this.userModel(userData);

        try {
            return await userToCreate.save();
        } catch (error) {
            if (error.code === 11000) {
                // 11000 mongoose error code of duplicate key
                throw new ConflictException('User already exists');
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async validateUser(signInUserDTO: SignInUserDTO): Promise<User> {
        const { password, ...data } = signInUserDTO;

        const user = await this.userModel.findOne(data).select('+password');

        if (!user && !(await compare(password, user.password))) {
            throw new UnauthorizedException('Invalid username or password');
        }

        return user;
    }

    async getUserById(id: string): Promise<User> {
        return await this.userModel.findById(id);
    }
}
