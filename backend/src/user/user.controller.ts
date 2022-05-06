import { Controller, UseGuards, Post, Res, Param, HttpStatus, NotFoundException, Get } from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/auth/shared/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/shared/decorators/get-user.decorator';
import { User } from './interfaces/user.interface';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly _userService: UserService) {}
    @Get('/suggestions')
    async getSuggestions(@Res() res: Response, @GetUser() user: User) {        
        const result = await this._userService.getSuggestions(user);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get('/:userId')
    async getUserById(@Res() res: Response, @Param('userId') userId: string) {
        const result = await this._userService.getUserById(userId);

        return res.status(HttpStatus.OK).json(result);
    }

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
    async unFollowUser(@Res() res: Response, @Param('userId') userId: string, @GetUser() user: User) {
        const userToUnfollow = await this._userService.getUserById(userId);

        if (!userToUnfollow) {
            throw new NotFoundException('User does not exist');
        }

        const result = await this._userService.unfollowUser(user, userToUnfollow);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get('/:userId/following')
    async getFollowing(@Res() res: Response, @Param('userId') userId: string) {
        const result = await this._userService.getFollowing(userId);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get('/:userId/followers')
    async getFollowers(@Res() res: Response, @Param('userId') userId: string) {
        const result = await this._userService.getFollowers(userId);

        return res.status(HttpStatus.OK).json(result);
    }

    
}
