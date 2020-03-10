import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.SERVER_PORT);
}
bootstrap();
