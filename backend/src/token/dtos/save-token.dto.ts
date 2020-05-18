import { IsString, IsNumber } from 'class-validator';

export class SaveTokenDTO {
    @IsString()
    readonly refreshToken: string;
    @IsNumber()
    readonly expiresIn: number;
    @IsString()
    readonly userId: string;
    @IsString()
    readonly userAgent: string;
}
