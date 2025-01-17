import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsController } from '../../src/modules/subscriptions/subscriptions.controller';
import { SubscriptionsService } from '../../src/modules/subscriptions/subscriptions.service';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { seedUser } from '../seeds/user.seed';
import { seedSubscription } from '../seeds/subscription.seed';
import { SubscriptionRequestDto } from '@subcontrol/shared-dtos/subscriptions';
import { Period, Currency } from '@subcontrol/shared-dtos/subscriptions';

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

      const otherUser = await seedUser();
      await seedSubscription({ user: { connect: { id: otherUser.id } } });

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

  describe('findOne', () => {
    it('should return a subscription by ID', async () => {
      const user = await seedUser();
      const subscription = await seedSubscription({
        user: { connect: { id: user.id } },
      });

      const result = await controller.findOne(
        {
          user: { id: user.id },
        } as Parameters<typeof controller.findOne>[0],
        subscription.id.toString()
      );
      expect(result).toHaveProperty('id', subscription.id);
      expect(result).toHaveProperty('name', subscription.name);
    });
  });

  describe('create', () => {
    it('should create a new subscription', async () => {
      const user = await seedUser();
      const createDto: SubscriptionRequestDto = {
        name: 'Test Subscription',
        period: Period.MONTHLY,
        centsPerPeriod: 1000,
        currency: Currency.AUD,
        startedAt: new Date(),
        cancelledAt: null,
      };

      const result = await controller.create(
        {
          user: { id: user.id },
        } as Parameters<typeof controller.create>[0],
        createDto
      );
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name', createDto.name);
    });
  });

  describe('update', () => {
    it('should update a subscription by ID', async () => {
      const user = await seedUser();
      const subscription = await seedSubscription({
        user: { connect: { id: user.id } },
      });

      const updateDto: SubscriptionRequestDto = {
        name: 'Updated Subscription',
        period: Period.MONTHLY,
        centsPerPeriod: 1000,
        currency: Currency.AUD,
        startedAt: new Date(),
        cancelledAt: null,
      };

      const result = await controller.update(
        {
          user: { id: user.id },
        } as Parameters<typeof controller.update>[0],
        subscription.id.toString(),
        updateDto
      );

      expect(result).toHaveProperty('id', subscription.id);
      expect(result).toHaveProperty('name', updateDto.name);
    });
  });

  describe('remove', () => {
    it('should delete a subscription by ID', async () => {
      const user = await seedUser();
      const subscription = await seedSubscription({
        user: { connect: { id: user.id } },
      });

      const result = await controller.remove(
        {
          user: { id: user.id },
        } as Parameters<typeof controller.remove>[0],
        subscription.id.toString()
      );
      expect(result).toBeDefined();

      await expect(
        controller.findOne(
          {
            user: { id: user.id },
          } as Parameters<typeof controller.findOne>[0],
          subscription.id.toString()
        )
      ).rejects.toThrowError('Subscription not found');
    });
  });
});
