import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from 'src/token/token.module';

@Module({
    imports: [UserModule, TokenModule, PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [PassportModule],
})
export class AuthModule {}
