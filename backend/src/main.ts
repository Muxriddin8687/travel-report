import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4200',
    ],
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT", "HEAD", "OPTIONS"],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
