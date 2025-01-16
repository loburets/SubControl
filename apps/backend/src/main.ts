import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './utils/swagger';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from './config/winston-logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonLoggerConfig),
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

  await app.listen(3000);
}
bootstrap();
