import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsController } from '../../src/modules/subscriptions/subscriptions.controller';
import { SubscriptionsService } from '../../src/modules/subscriptions/subscriptions.service';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { seedUser } from '../seeds/user.seed';
import { seedSubscription } from '../seeds/subscription.seed';
import { SubscriptionRequestDto } from '@subcontrol/shared-dtos/subscriptions';
import { Period, Currency } from '@subcontrol/shared-dtos/subscriptions';
import { PrismaClient } from '@prisma/client';
import {
  addMonths,
  addWeeks,
  startOfDay,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

const prisma = new PrismaClient();

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

    it('should not return subscription to another user', async () => {
      const user = await seedUser();
      const otherUser = await seedUser();
      const subscription = await seedSubscription({
        user: { connect: { id: user.id } },
      });

      await expect(
        controller.findOne(
          {
            user: { id: otherUser.id },
          } as Parameters<typeof controller.findOne>[0],
          subscription.id.toString()
        )
      ).rejects.toThrowError('Subscription not found');
    });

    it('should return a monthly subscription with correct stats fields', async () => {
      const user = await seedUser();
      const subscription = await seedSubscription({
        user: { connect: { id: user.id } },
        period: Period.MONTHLY,
        startedAt: subDays(subMonths(new Date(), 3), 5),
        centsPerPeriod: 200,
        currency: Currency.USD,
        cancelledAt: null,
      });

      const result = await controller.findOne(
        {
          user: { id: user.id },
        } as Parameters<typeof controller.findOne>[0],
        subscription.id.toString()
      );

      expect(result).toHaveProperty('id', subscription.id);
      expect(result).toHaveProperty('name', subscription.name);
      expect(result).toHaveProperty('costPerMonth', 200);
      expect(result).toHaveProperty('costPerYear', 200 * 12);
      expect(result).toHaveProperty('totalSpent', 200 * 3 + 200);
      expect(result).toHaveProperty(
        'nextPaymentDate',
        fromZonedTime(startOfDay(subDays(addMonths(new Date(), 1), 5)), 'UTC')
      );
    });

    it('should return a weekly subscription with correct stats fields', async () => {
      const user = await seedUser();
      const subscription = await seedSubscription({
        user: { connect: { id: user.id } },
        period: Period.WEEKLY,
        startedAt: subDays(subWeeks(new Date(), 8), 5),
        centsPerPeriod: 200,
        currency: Currency.USD,
        cancelledAt: null,
      });

      const result = await controller.findOne(
        {
          user: { id: user.id },
        } as Parameters<typeof controller.findOne>[0],
        subscription.id.toString()
      );

      expect(result).toHaveProperty('id', subscription.id);
      expect(result).toHaveProperty('name', subscription.name);
      expect(result).toHaveProperty('costPerMonth', 869);
      expect(result).toHaveProperty('costPerYear', 10400);
      expect(result).toHaveProperty('totalSpent', 8 * 200 + 200);
      expect(result).toHaveProperty(
        'nextPaymentDate',
        fromZonedTime(startOfDay(subDays(addWeeks(new Date(), 1), 5)), 'UTC')
      );
    });

    it('should return a yearly subscription with correct stats fields', async () => {
      const user = await seedUser();
      const subscription = await seedSubscription({
        user: { connect: { id: user.id } },
        period: Period.YEARLY,
        startedAt: subDays(subMonths(new Date(), 3), 5),
        centsPerPeriod: 200,
        currency: Currency.USD,
        cancelledAt: null,
      });

      const result = await controller.findOne(
        {
          user: { id: user.id },
        } as Parameters<typeof controller.findOne>[0],
        subscription.id.toString()
      );

      expect(result).toHaveProperty('id', subscription.id);
      expect(result).toHaveProperty('name', subscription.name);
      expect(result).toHaveProperty('costPerMonth', 17);
      expect(result).toHaveProperty('costPerYear', 200);
      expect(result).toHaveProperty('totalSpent', 200);
      expect(result).toHaveProperty(
        'nextPaymentDate',
        fromZonedTime(startOfDay(subDays(addMonths(new Date(), 9), 5)), 'UTC')
      );
    });

    it('should return subscription with correct stats fields for cancellation day before next payment', async () => {
      const user = await seedUser();
      const subscription = await seedSubscription({
        user: { connect: { id: user.id } },
        period: Period.MONTHLY,
        startedAt: subDays(subMonths(new Date(), 3), 5),
        centsPerPeriod: 200,
        currency: Currency.USD,
        cancelledAt: subDays(subMonths(new Date(), 1), 6),
      });

      const result = await controller.findOne(
        {
          user: { id: user.id },
        } as Parameters<typeof controller.findOne>[0],
        subscription.id.toString()
      );
      expect(result).toHaveProperty('id', subscription.id);
      expect(result).toHaveProperty('name', subscription.name);
      expect(result).toHaveProperty('costPerMonth', 200);
      expect(result).toHaveProperty('costPerYear', 200 * 12);
      expect(result).toHaveProperty('totalSpent', 200 * 2);
      expect(result).toHaveProperty('nextPaymentDate', null);
    });

    it('should return subscription with correct stats fields for cancellation day after next payment', async () => {
      const user = await seedUser();
      const subscription = await seedSubscription({
        user: { connect: { id: user.id } },
        period: Period.MONTHLY,
        startedAt: subDays(subMonths(new Date(), 3), 5),
        centsPerPeriod: 200,
        currency: Currency.USD,
        cancelledAt: subDays(subMonths(new Date(), 1), 4),
      });

      const result = await controller.findOne(
        {
          user: { id: user.id },
        } as Parameters<typeof controller.findOne>[0],
        subscription.id.toString()
      );
      expect(result).toHaveProperty('id', subscription.id);
      expect(result).toHaveProperty('name', subscription.name);
      expect(result).toHaveProperty('costPerMonth', 200);
      expect(result).toHaveProperty('costPerYear', 200 * 12);
      expect(result).toHaveProperty('totalSpent', 200 * 3);
      expect(result).toHaveProperty('nextPaymentDate', null);
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

      const subscription = await prisma.subscription.findUnique({
        where: { id: result.id },
      });
      expect(subscription?.userId).toBe(user.id);
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

    it('should not update subscription of another user', async () => {
      const user = await seedUser();
      const anotherUser = await seedUser();
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

      await expect(
        controller.update(
          {
            user: { id: anotherUser.id },
          } as Parameters<typeof controller.update>[0],
          subscription.id.toString(),
          updateDto
        )
      ).rejects.toThrowError('Subscription not found');
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

    it('should not delete subscription of another user', async () => {
      const user = await seedUser();
      const anotherUser = await seedUser();
      const subscription = await seedSubscription({
        user: { connect: { id: user.id } },
      });

      await expect(
        controller.remove(
          {
            user: { id: anotherUser.id },
          } as Parameters<typeof controller.remove>[0],
          subscription.id.toString()
        )
      ).rejects.toThrowError('Subscription not found');
    });
  });
});
