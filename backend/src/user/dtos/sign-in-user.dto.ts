import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignInUserDTO {
    @IsOptional()
    @IsString()
    readonly email: string;
    @IsOptional()
    @IsString()
    readonly username?: string;
    @IsNotEmpty()
    readonly password: string;
}
