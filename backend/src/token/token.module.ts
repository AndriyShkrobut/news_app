import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from './schemas/token.schema';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from 'src/auth/shared/strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
        JwtModule.register({
            secret: process.env.SECRET_ACCESS_KEY,
            signOptions: {
                expiresIn: process.env.SECRET_ACCESS_KEY_EXPIRATION_TIME,
            },
        }),
        UserModule,
    ],
    providers: [TokenService, JwtStrategy],
    exports: [TokenService, JwtStrategy],
})
export class TokenModule {}
