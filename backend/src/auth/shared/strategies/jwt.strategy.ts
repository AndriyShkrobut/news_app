import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/interfaces/user.interface';
import { JwtAccessPayload } from 'src/token/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly _userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_ACCESS_KEY,
        });
    }

    async validate(payload: JwtAccessPayload): Promise<User> {
        const { id } = payload;
        const user = await this._userService.getUserById(id);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
