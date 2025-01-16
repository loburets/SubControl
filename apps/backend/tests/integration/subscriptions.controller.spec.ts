import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsController } from '../../src/modules/subscriptions/subscriptions.controller';
import { SubscriptionsService } from '../../src/modules/subscriptions/subscriptions.service';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { seedUser } from '../seeds/user.seed';
import { seedSubscription } from '../seeds/subscription.seed';

describe('SubscriptionsController', () => {
  let controller: SubscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionsController],
      providers: [SubscriptionsService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<SubscriptionsController>(SubscriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return list of subscriptions', async () => {
      const user = await seedUser();
      await seedSubscription({ user: { connect: { id: user.id } } });
      await seedSubscription({ user: { connect: { id: user.id } } });

      // other user is not related:
      const user2 = await seedUser();
      await seedSubscription({ user: { connect: { id: user2.id } } });

      const subscriptionsResponse = await controller.findAll({
        user: { id: user.id },
      } as Parameters<typeof controller.findAll>[0]);

      expect(subscriptionsResponse).toHaveProperty(
        'subscriptions',
        expect.any(Array)
      );

      expect(subscriptionsResponse.subscriptions).toHaveLength(2);
      expect(subscriptionsResponse.subscriptions[0]).toHaveProperty('id');
      expect(subscriptionsResponse.subscriptions[0]).toHaveProperty('name');
      // not exposing deletedAt field to check filtering per DTO object
      expect(subscriptionsResponse.subscriptions[0]).not.toHaveProperty(
        'deletedAt'
      );
    });
  });
});
