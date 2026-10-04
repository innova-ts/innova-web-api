import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

const setAppConfig = (app: NestApplication): { port: number } => {
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') ?? 3000;

  const frontendURL: string = configService.get<string>('FRONTEND_URL') ?? '';
  app.setGlobalPrefix('api');
  app.enableCsrfProtection({
    trustedOrigins: [frontendURL]
  });

  return { port }
}

const setUpPipes = (app: NestApplication): void => {
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    errorFormat: 'grouped'
  }));
}

async function bootstrap(): Promise<void> {
  const app: NestApplication = await NestFactory.create(AppModule);
  
  const { port } = setAppConfig(app);

  setUpPipes(app);
  
  await app.listen(port);
}
await bootstrap();
