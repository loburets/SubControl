import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthService } from '../modules/auth/auth.service';

export async function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Subscription Manager API')
    .setDescription(
      'API documentation for the Subscription Manager application'
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'jwt'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const authService = app.get(AuthService);
  const { accessToken } = await authService.register({
    // to simplify no test flag for the user, can be filtered by emails if required
    email: `swagger-test-user+${Math.random()}@test.com`,
    password: '123456',
  });

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      authAction: {
        jwt: {
          name: 'Bearer',
          schema: {
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: `${accessToken}`,
        },
      },
    },
  });
}
