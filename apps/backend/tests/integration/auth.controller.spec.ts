import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { AuthController } from '../../src/modules/auth/auth.controller';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { seedUser } from '../seeds/user.seed';
import { TransformersModule } from '../../src/modules/transformers/transformers.module';

const prisma = new PrismaClient();

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [PrismaModule, AuthModule, TransformersModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should create user and return access token', async () => {
      const email = faker.internet.email();
      const userBeforeTest = await prisma.user.findUnique({
        where: { email },
      });
      expect(userBeforeTest).toBeNull();

      const response = await controller.register({
        email,
        password: faker.internet.password(),
      });

      expect(response).toHaveProperty('accessToken', expect.any(String));
      // no additional data exposed
      expect(Object.keys(response)).toHaveLength(1);
      const user = await prisma.user.findUnique({
        where: { email },
      });
      expect(user).toBeDefined();
    });

    it('should trigger error if email is already taken', async () => {
      const email = faker.internet.email();
      await seedUser({ email });

      await expect(
        controller.register({
          email,
          password: faker.internet.password(),
        })
      ).rejects.toThrow('Email is already taken');
    });
  });

  describe('login', () => {
    it('should login user after registration and return access token', async () => {
      const credentials = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const registerResponse = await controller.register(credentials);
      const loginResponse = await controller.login(credentials);

      expect(registerResponse).toHaveProperty(
        'accessToken',
        expect.any(String)
      );
      expect(loginResponse).toHaveProperty('accessToken', expect.any(String));
      // no additional data exposed
      expect(Object.keys(loginResponse)).toHaveLength(1);
    });

    it('should not login user by wrong password', async () => {
      const credentials = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const registerResponse = await controller.register(credentials);
      expect(registerResponse).toHaveProperty(
        'accessToken',
        expect.any(String)
      );

      await expect(
        controller.login({
          email: credentials.email,
          password: faker.internet.password(),
        })
      ).rejects.toThrow('Invalid credentials');
    });

    it('should not login user by wrong email', async () => {
      const credentials = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const registerResponse = await controller.register(credentials);
      expect(registerResponse).toHaveProperty(
        'accessToken',
        expect.any(String)
      );

      await expect(
        controller.login({
          email: faker.internet.email(),
          password: credentials.password,
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('createDemo', () => {
    it('should create user with subscriptions and return access token', async () => {
      const subscriptionsCount = await prisma.subscription.count();
      const response = await controller.createDemo();

      expect(response).toHaveProperty('accessToken', expect.any(String));
      // no additional data exposed
      expect(Object.keys(response)).toHaveLength(1);

      // note: not a good test as it's not guaranteed that no other tests are running in parallel
      // to improve it a unit test can be written for the authService.makeDemoAccount method
      expect(prisma.subscription.count()).resolves.toBeGreaterThan(
        subscriptionsCount
      );
    });
  });
});
