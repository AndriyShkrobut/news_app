import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';

import { User } from './interfaces/user.interface';
import { SignUpUserDTO } from './dtos/sign-up-user.dto';
import { SignInUserDTO } from './dtos/sign-in-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly _userModel: Model<User>) {}

    async createUser(createUserDTO: SignUpUserDTO): Promise<User> {
        const { password } = createUserDTO;

        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);

        const userData = {
            ...createUserDTO,
            password: hashedPassword,
            salt,
        };

        const userToCreate = new this._userModel(userData);

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
        const { password, email } = signInUserDTO;

        const user = await this._userModel.findOne({ email }).select('+password');

        if (!user && !(await compare(password, user.password))) {
            throw new UnauthorizedException('Invalid username or password');
        }

        return user;
    }

    async getUserById(id: string): Promise<User> {
        return await this._userModel.findById(id);
    }

    async followUser(currentUser: User, userToFollow: User): Promise<User[]> {
        if (currentUser.following.includes(userToFollow.id) && userToFollow.followers.includes(currentUser.id)) {
            throw new ConflictException('You already follow this user');
        }

        try {
            currentUser.following = [...currentUser.following, userToFollow.id];
            userToFollow.followers = [...currentUser.followers, currentUser.id];

            return await Promise.all([currentUser.save(), userToFollow.save()]);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async unfollowUser(currentUser: User, userToUnfollow: User): Promise<User[]> {
        try {
            currentUser.following = currentUser.following.filter(
                userId => String(userId) !== String(userToUnfollow.id),
            );
            userToUnfollow.followers = userToUnfollow.followers.filter(
                userId => String(userId) !== String(currentUser.id),
            );

            return await Promise.all([currentUser.save(), userToUnfollow.save()]);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
