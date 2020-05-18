import { Controller, UseGuards, Post, Body, Res, Param, HttpStatus, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/shared/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/shared/decorators/get-user.decorator';
import { User } from './interfaces/user.interface';
import { Response } from 'express';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post('/:userId/follow')
    async followUser(@Res() res: Response, @Param('userId') userId: string, @GetUser() user: User) {
        const userToFollow = await this._userService.getUserById(userId);

        if (!userToFollow) {
            throw new NotFoundException('User does not exist');
        }

        const result = await this._userService.followUser(user, userToFollow);

        return res.status(HttpStatus.OK).json(result);
    }

    @Post('/:userId/unfollow')
    async unfollowUser(@Res() res: Response, @Param('userId') userId: string, @GetUser() user: User) {
        const userToUnfollow = await this._userService.getUserById(userId);

        if (!userToUnfollow) {
            throw new NotFoundException('User does not exist');
        }

        const result = await this._userService.unfollowUser(user, userToUnfollow);

        return res.status(HttpStatus.OK).json(result);
    }
}
