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

  // ===== AQUI É ONDE VOCÊ ADICIONA A CONFIGURAÇÃO CORS =====
  
  // Middleware de debug (opcional - para ver o que está acontecendo)
  app.use((req, res, next) => {
    console.log('=== DEBUG REQUEST ===');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Origin:', req.headers.origin);
    console.log('=====================');
    next();
  });

  // CONFIGURAÇÃO CORS MANUAL - COLE ESTE CÓDIGO:
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = [
      'https://bikeline.com.br',
      'https://www.bikeline.com.br',
      'http://localhost:3000'
    ];

    console.log('Configurando CORS para origin:', origin);
    
    // Define Access-Control-Allow-Origin
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    
    // Define outros headers CORS
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Para requisições OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
      console.log('Respondendo requisição OPTIONS');
      return res.status(204).end();
    }
    
    next();
  });

  // ===== FIM DA CONFIGURAÇÃO CORS =====

  await app.listen(process.env.PORT ?? 3002);
  console.log('API rodando na porta 3002 com CORS configurado');
}
bootstrap();