import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { AuthModule } from 'src/auth/auth.module';
import { NewsSchema } from './schemas/news.schema';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: 'Post', schema: NewsSchema }]),
    ],
    controllers: [NewsController],
    providers: [NewsService],
})
export class NewsModule {}
