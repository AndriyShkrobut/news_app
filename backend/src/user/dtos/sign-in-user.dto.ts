import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignInUserDTO {
    @IsEmail()
    @IsString()
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;
}
