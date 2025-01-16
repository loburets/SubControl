import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { AuthController } from '../../src/modules/auth/auth.controller';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from '../../src/modules/auth/auth.module';

const prisma = new PrismaClient();

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [PrismaModule, AuthModule],
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
});
