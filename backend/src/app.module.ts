import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/news_app', {
            useNewUrlParser: true,
        }),
        NewsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
