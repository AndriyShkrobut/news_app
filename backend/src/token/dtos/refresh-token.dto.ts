import { IsString } from 'class-validator';

export class RefreshTokenDTO {
    @IsString()
    readonly refreshToken: string;
}
