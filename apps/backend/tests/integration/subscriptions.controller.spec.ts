import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsController } from '../../src/modules/subscriptions/subscriptions.controller';
import { SubscriptionsService } from '../../src/modules/subscriptions/subscriptions.service';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { seedUser } from '../seeds/user.seed';
import { AuthService } from '../../src/modules/auth/auth.service';

describe('SubscriptionsController', () => {
  let controller: SubscriptionsController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionsController],
      providers: [SubscriptionsService, AuthService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<SubscriptionsController>(SubscriptionsController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return list of subscriptions', async () => {
      const user = await seedUser(authService);
      const subscriptionsResponse = await controller.findAll({
        user: { id: user.id },
      } as Parameters<typeof controller.findAll>[0]);

      // TODO extend the test to check that only subscriptions of current user are returned
      expect(subscriptionsResponse).toHaveProperty(
        'subscriptions',
        expect.any(Array)
      );
    });
  });
});
