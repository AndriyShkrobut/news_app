import { Controller, Post, Body, Res, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { SignUpUserDTO } from 'src/user/dtos/sign-up-user.dto';
import { SignInUserDTO } from 'src/user/dtos/sign-in-user.dto';
import { RefreshTokenDTO } from 'src/token/dtos/refresh-token.dto';
import { GetUser } from './shared/decorators/get-user.decorator';
import { User } from 'src/user/interfaces/user.interface';
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post('/signup')
    async signUp(@Res() res: Response, @Body() signUpUserDTO: SignUpUserDTO) {
        const createdUser = await this._authService.signUp(signUpUserDTO);

        return res.status(HttpStatus.CREATED).json(createdUser);
    }

    @Post('/signin')
    async signIn(@Req() req: Request, @Res() res: Response, @Body() signInUserDTO: SignInUserDTO) {
        const userAgent = req.get('user-agent');
        const authData = await this._authService.signIn(signInUserDTO, userAgent);

        return res.status(HttpStatus.OK).json(authData);
    }

    @Post('/signout')
    @UseGuards(JwtAuthGuard)
    async signOut(@Req() req: Request, @Res() res: Response, @GetUser() user: User) {
        const userAgent = req.get('user-agent');
        const isSignOut = await this._authService.signOut(user, userAgent);

        return res.status(HttpStatus.OK).json(isSignOut);
    }

    @Post('/token/refresh')
    async refreshToken(@Res() res: Response, @Body() refreshTokenDTO: RefreshTokenDTO) {
        const authData = await this._authService.refreshToken(refreshTokenDTO);

        return res.status(HttpStatus.OK).json(authData);
    }
}
