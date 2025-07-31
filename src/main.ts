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

  // ✅ CONFIGURAÇÃO CORS RECOMENDADA
  app.enableCors({
    origin: [
      'https://bikeline.com.br',
      'https://www.bikeline.com.br',
      'http://localhost:3000',
    ],
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
  });

  // 🔍 Middleware de debug (opcional)
  app.use((req, res, next) => {
    console.log('=== DEBUG REQUEST ===');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Origin:', req.headers.origin);
    console.log('=====================');
    next();
  });

  await app.listen(process.env.PORT ?? 3002);
  console.log('API rodando na porta 3002 com CORS configurado');
}
bootstrap();
