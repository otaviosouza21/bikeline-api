// main.ts - Correção definitiva
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS Configuration
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
      'Authorization'
    ],
    credentials: false, // ⚠️ IMPORTANTE: Deve ser false
  });

  // 🔧 MIDDLEWARE CRÍTICO: Garantir headers CORS em TODAS as respostas
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = [
      'https://bikeline.com.br',
      'https://www.bikeline.com.br',
      'http://localhost:3000',
      'http://localhost:3001',
    ];

    // 🎯 ESTE É O FIX PRINCIPAL: Adicionar Access-Control-Allow-Origin em TODAS as respostas
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }

    // Headers CORS obrigatórios para todas as requisições
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // 🚨 CRÍTICO: Deve ser 'false' (string) e não false (boolean)
    res.header('Access-Control-Allow-Credentials', 'false');

    console.log(`📥 ${req.method} ${req.url} - Origin: ${origin || 'sem origin'}`);
    
    // Para OPTIONS, responder imediatamente
    if (req.method === 'OPTIONS') {
      console.log('✅ PREFLIGHT respondido para:', req.url);
      return res.status(204).end();
    }

    next();
  });

  // Validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT ?? 3002;
  await app.listen(port);
  
  console.log('🚀 API rodando na porta', port);
  console.log('✅ CORS headers serão enviados para TODAS as requisições');
}

bootstrap();

// 🔧 ALTERNATIVA: Se você estiver usando um proxy reverso (nginx/apache)
// Configure no seu servidor web também:
/*
Adicione no seu nginx.conf:

location /api {
    # Headers CORS para todas as respostas
    add_header Access-Control-Allow-Origin $http_origin always;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE, PATCH" always;
    add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization" always;
    add_header Access-Control-Allow-Credentials false always;
    
    # Handle preflight
    if ($request_method = OPTIONS) {
        add_header Access-Control-Max-Age 1728000;
        add_header Content-Type 'text/plain charset=UTF-8';
        add_header Content-Length 0;
        return 204;
    }
    
    proxy_pass http://localhost:3002;
}
*/