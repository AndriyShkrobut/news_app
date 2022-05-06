import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { driver, auth } from 'neo4j-driver';

import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserRelationService } from './user-relation.service';

export const Neo4jProvider: Provider = {
    provide: 'Neo4j',
    useFactory: () => driver(process.env.NEO4J_HOST, auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)),
};

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [Neo4jProvider, UserService, UserRelationService],
    exports: [UserService, UserRelationService],
    controllers: [UserController],
})
export class UserModule {}
