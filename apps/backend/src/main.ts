import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
