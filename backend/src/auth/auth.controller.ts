import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignUpUserDTO } from 'src/users/dtos/sign-up-user.dto';
import { SignInUserDTO } from 'src/users/dtos/sign-in-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    async signUp(@Res() res: Response, @Body() signUpUserDTO: SignUpUserDTO) {
        const createdUser = await this.authService.signUp(signUpUserDTO);

        return res.status(HttpStatus.CREATED).json(createdUser);
    }

    @Post('/signin')
    async signIn(@Res() res: Response, @Body() signInUserDTO: SignInUserDTO) {
        const accessToken = await this.authService.signIn(signInUserDTO);

        return res.status(HttpStatus.OK).json({
            accessToken,
            expiresIn: process.env.SECRET_KEY_EXPIRATION_TIME,
        });
    }
}
