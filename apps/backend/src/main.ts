import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Subscription Manager API')
    .setDescription(
      'API documentation for the Subscription Manager application'
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI will be available at /api

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes extra fields
      forbidNonWhitelisted: true, // Throws an error for extra fields
      transform: true, // Automatically transforms request payloads into DTO instances
    })
  );

  await app.listen(3000);
}
bootstrap();
