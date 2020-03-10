import { IsNotEmpty } from 'class-validator';

export class SignInUserDTO {
    readonly email?: string;

    readonly username?: string;

    @IsNotEmpty()
    readonly password: string;
}
