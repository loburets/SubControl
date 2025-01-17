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

  it('/subscriptions (GET)', async () => {
    const credentials = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    // Register the user
    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send(credentials)
      .expect(201)
      .expect('Content-Type', /json/);

    const registerAccessToken = registerResponse.body.accessToken;
    expect(registerAccessToken).toBeDefined();

    // Create subscription as the registered user
    const createSubscriptionResponse = await request(app.getHttpServer())
      .post('/subscriptions')
      .set('Authorization', `Bearer ${registerAccessToken}`)
      .send({
        name: 'Test Subscription',
        period: 'MONTHLY',
        centsPerPeriod: 1,
        currency: 'GBP',
        startedAt: '2025-01-17T14:03:45.520Z',
      })
      .expect(201)
      .expect('Content-Type', /json/);

    expect(createSubscriptionResponse.body).toMatchObject({
      id: expect.any(Number),
      name: 'Test Subscription',
      createdAt: expect.any(String),
      startedAt: expect.any(String),
      period: 'MONTHLY',
      centsPerPeriod: 1,
      currency: 'GBP',
    });

    // Login the user
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(credentials)
      .expect(201)
      .expect('Content-Type', /json/);

    const accessToken = loginResponse.body.accessToken;
    expect(accessToken).toBeDefined();

    // Fetch subscriptions as the logged in user
    const subscriptionsResponse = await request(app.getHttpServer())
      .get('/subscriptions')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(subscriptionsResponse.body).toMatchObject({
      subscriptions: expect.arrayContaining([createSubscriptionResponse.body]),
    });
  });
});
