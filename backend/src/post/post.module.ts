import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AuthModule } from 'src/auth/auth.module';
import { PostSchema } from './schemas/post.schema';
import { CommentSchema } from './schemas/comment.schema';
import { CommentService } from './comment.service';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            { name: 'Post', schema: PostSchema },
            { name: 'Comment', schema: CommentSchema },
        ]),
    ],
    controllers: [PostController],
    providers: [PostService, CommentService],
})
export class PostModule {}
