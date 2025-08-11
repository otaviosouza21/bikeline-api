// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS configurado apenas aqui (sem duplicar com middleware manual)
  app.enableCors({
    origin: [
      'https://bikeline.com.br',
      'https://www.bikeline.com.br',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    credentials: false, // não envia cookies/sessão
  });

  // 📌 Validações globais
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT ?? 3002;
  await app.listen(port);

  console.log(`🚀 API rodando na porta ${port}`);
  console.log('✅ CORS habilitado para:');
  console.log([
    'https://bikeline.com.br',
    'https://www.bikeline.com.br',
    'http://localhost:3000',
    'http://localhost:3001',
  ]);
}

bootstrap();
