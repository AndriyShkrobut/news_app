import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';

import { UserRelationService } from 'src/user/user-relation.service';
import { User } from './interfaces/user.interface';
import { SignUpUserDTO } from './dtos/sign-up-user.dto';
import { SignInUserDTO } from './dtos/sign-in-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly _userModel: Model<User>,
        private readonly _userRelationService: UserRelationService,
    ) {}

    async createUser(createUserDTO: SignUpUserDTO): Promise<User> {
        const { password } = createUserDTO;

        try {
            const salt = await genSalt();
            const hashedPassword = await hash(password, salt);

            const userData = {
                ...createUserDTO,
                password: hashedPassword,
                salt,
            };

            const userToCreate = new this._userModel(userData);
            const { id, username } = userToCreate;

            // await this._userRelationService.createUser({ id, username });

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

        if (!user || !(await compare(password, user.password))) {
            throw new BadRequestException('Invalid username or password');
        }

        return user;
    }

    async getUserById(id: string): Promise<User> {
        return await this._userModel.findById(id);
    }

    async followUser(currentUser: User, userToFollow: User): Promise<User[]> {
        const { id: currentUserId } = currentUser;
        const { id: userToFollowId } = userToFollow;

        try {
            if (currentUser.following.includes(userToFollowId) && userToFollow.followers.includes(currentUserId)) {
                throw new ConflictException('You already follow this user');
            }

            // await this._userRelationService.followUser(currentUserId, userToFollowId);

            // currentUser.following = await this._userRelationService.getFollowing(currentUserId);
            // userToFollow.followers = await this._userRelationService.getFollowers(userToFollowId);

            return await Promise.all([currentUser.save(), userToFollow.save()]);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async unfollowUser(currentUser: User, userToUnfollow: User): Promise<User[]> {
        const { id: currentUserId } = currentUser;
        const { id: userToUnFollowId } = userToUnfollow;

        try {
            // await this._userRelationService.unFollowUser(currentUserId, userToUnFollowId);

            // currentUser.following = await this._userRelationService.getFollowing(currentUserId);
            // userToUnfollow.followers = await this._userRelationService.getFollowers(userToUnFollowId);

            return await Promise.all([currentUser.save(), userToUnfollow.save()]);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getFollowing(userId: string): Promise<User[]> {
        try {
            const followingIds = await this._userRelationService.getFollowing(userId);

            const following = await this._userModel.find({ _id: { $in: followingIds } }).exec();

            return following;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getFollowers(userId: string): Promise<User[]> {
        try {
            const followersIds = await this._userRelationService.getFollowers(userId);

            const followers = await this._userModel.find({ _id: { $in: followersIds } }).exec();

            return followers;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getSuggestions(currentUser: User): Promise<User[]> {
        const { id } = currentUser;

        try {
            const suggestedUserIds = await this._userRelationService.getSuggestions(id);

            const users = await this._userModel.find({ _id: { $in: suggestedUserIds } }).exec();

            return users;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
