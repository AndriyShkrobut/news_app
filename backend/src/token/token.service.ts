import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

import { Token } from './interfaces/token.interface';
import { SaveTokenDTO } from './dtos/save-token.dto';
import { RefreshTokenDTO } from './dtos/refresh-token.dto';
import { JwtRefreshPayload, JwtAccessPayload } from 'src/token/interfaces/jwt-payload.interface';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel('Token') private readonly _tokenModel: Model<Token>,
        private readonly _jwtService: JwtService,
    ) {}

    async saveToken(createTokenDTO: SaveTokenDTO): Promise<Token> {
        const tokenToCreate = new this._tokenModel(createTokenDTO);

        return await tokenToCreate.save();
    }

    async deleteToken(userId: string, userAgent: string): Promise<Token> {
        const tokenToDelete = await this._tokenModel.findOneAndDelete({
            userId,
            userAgent,
        });

        if (!tokenToDelete) {
            throw new NotFoundException('Token does not exist');
        }

        return tokenToDelete;
    }

    async deleteAllUserTokens(
        userId: string,
    ): Promise<{
        ok?: number;
        n?: number;
    }> {
        const deletedTokens = await this._tokenModel.deleteMany({ userId });

        if (!deletedTokens.ok || !deletedTokens.n) {
            throw new NotFoundException('No tokens found');
        }

        return deletedTokens;
    }

    async validateRefreshToken(refreshTokenDTO: RefreshTokenDTO): Promise<JwtRefreshPayload> {
        const refreshTokenSecret = process.env.SECRET_REFRESH_KEY;
        const { refreshToken } = refreshTokenDTO;

        const token = await this._tokenModel.findOne(refreshTokenDTO);

        if (!token) {
            throw new UnauthorizedException('Invalid token');
        }

        if (Date.now() >= token.expiresIn) {
            throw new UnauthorizedException('Invalid token');
        }

        const decodedToken = jwt.verify(refreshToken, refreshTokenSecret) as JwtRefreshPayload;

        const { userAgent, id } = decodedToken;

        return { userAgent, id };
    }

    async exists(userId: string, refreshToken: string): Promise<boolean> {
        return await this._tokenModel.exists({ userId, refreshToken });
    }

    async generateAccessToken(payload: JwtAccessPayload): Promise<string> {
        return await this._jwtService.signAsync(payload);
    }

    async generateRefreshToken(payload: JwtRefreshPayload): Promise<string> {
        const { userAgent, id } = payload;
        const refreshTokenSecret = process.env.SECRET_REFRESH_KEY;
        const refreshTokenExpirationTime = process.env.SECRET_REFRESH_KEY_EXPIRATION_TIME;

        const refreshExpiresIn = Date.now() + Number(refreshTokenExpirationTime);

        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: refreshTokenExpirationTime,
        });

        await this.saveToken({ refreshToken, userAgent: userAgent, userId: id, expiresIn: refreshExpiresIn });

        return refreshToken;
    }
}
