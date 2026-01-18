import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: configService.get('ALLOWED_ORIGINS')?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  const port = configService.get('API_PORT') || 4000;
  await app.listen(port);

  console.log(`🚀 HDIP Backend Server running on http://localhost:${port}`);
  console.log(`📊 GraphQL Playground: http://localhost:${port}/graphql`);
}

bootstrap();
