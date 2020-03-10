import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/interfaces/user.interface';
import { SignUpUserDTO } from 'src/users/dtos/sign-up-user.dto';
import { SignInUserDTO } from 'src/users/dtos/sign-in-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(signUpUserDTO: SignUpUserDTO): Promise<User> {
        const userToCreate = await this.userService.createUser(signUpUserDTO);

        return userToCreate;
    }

    async signIn(signInUserDTO: SignInUserDTO): Promise<string> {
        const user = await this.userService.validateUser(signInUserDTO);

        const { username, id } = user;

        const payload: JwtPayload = { username, id };

        return await this.jwtService.signAsync(payload);
    }
}
