import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // ✅ Habilita CORS para localhost:3000 (frontend)
  app.enableCors({
    origin: [
      'https://bikeline.com.br',
      'https://www.bikeline.com.br',
      'http://localhost:3000',
    ],
  });

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
