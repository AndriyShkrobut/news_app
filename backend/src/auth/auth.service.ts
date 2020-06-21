import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/interfaces/user.interface';
import { SignUpUserDTO } from 'src/user/dtos/sign-up-user.dto';
import { SignInUserDTO } from 'src/user/dtos/sign-in-user.dto';
import { TokenService } from 'src/token/token.service';
import { RefreshTokenDTO } from 'src/token/dtos/refresh-token.dto';
import { AuthData } from './interfaces/auth-data.interface';

@Injectable()
export class AuthService {
    constructor(private readonly _userService: UserService, private readonly _tokenService: TokenService) {}

    async signUp(signUpUserDTO: SignUpUserDTO, userAgent: string): Promise<AuthData> {
        const { username, id } = await this._userService.createUser(signUpUserDTO);

        const accessToken = await this._tokenService.generateAccessToken({ id, username });
        const refreshToken = await this._tokenService.generateRefreshToken({ id, userAgent });

        return { accessToken, refreshToken };
    }

    async signIn(signInUserDTO: SignInUserDTO, userAgent: string): Promise<AuthData> {
        const user = await this._userService.validateUser(signInUserDTO);

        const { username, id } = user;

        const accessToken = await this._tokenService.generateAccessToken({ id, username });
        const refreshToken = await this._tokenService.generateRefreshToken({ id, userAgent });

        return { accessToken, refreshToken };
    }

    async signOut(user: User, userAgent: string): Promise<boolean> {
        const { _id: userId } = user;

        return !!(await this._tokenService.deleteToken(userId, userAgent));
    }

    async refreshToken(refreshTokenDTO: RefreshTokenDTO): Promise<AuthData> {
        const payload = await this._tokenService.validateRefreshToken(refreshTokenDTO);

        if (!payload) {
            throw new UnauthorizedException('Invalid token');
        }

        const { id, userAgent } = payload;

        const { username } = await this._userService.getUserById(id);

        await this._tokenService.deleteToken(id, userAgent);

        const accessToken = await this._tokenService.generateAccessToken({ id, username });
        const refreshToken = await this._tokenService.generateRefreshToken({ id, userAgent });

        return { accessToken, refreshToken };
    }
}
