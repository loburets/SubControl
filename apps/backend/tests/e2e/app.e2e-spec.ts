import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/subscriptions (GET)', () => {
    const credentials = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(credentials)
      .expect(201)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.accessToken).toBeDefined();
      });
  });
});
