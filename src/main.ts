import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;
  const frontendURL:string = configService.get<string>('FRONTEND_URL') ?? ''
  app.setGlobalPrefix('api');
  app.enableCsrfProtection({
    trustedOrigins: [frontendURL]
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    errorFormat: 'grouped'
  }));
  
  await app.listen(port);
}
await bootstrap();
