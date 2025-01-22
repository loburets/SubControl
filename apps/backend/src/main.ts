import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './utils/swagger';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from './config/winston-logger.config';
import Bugsnag from '@bugsnag/js';
import { AllExceptionsFilter } from './utils/exceptionsFilter';

async function bootstrap() {
  Bugsnag.start({
    apiKey: process.env.BUGSNAG_API_KEY || '',
    appVersion: '1.0.0',
  });

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonLoggerConfig),
  });

  app.enableCors({
    origin: 'http://localhost:3000', // React local development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.setGlobalPrefix('/api/v1');
  await setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes extra fields in requests
      forbidNonWhitelisted: true, // Throws an error for extra fields
      transform: true, // Automatically transforms request payloads into DTO instances
    })
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3001);
}
bootstrap();
