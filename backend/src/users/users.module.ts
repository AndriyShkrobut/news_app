import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersSchema } from './schemas/users.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }]),
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
