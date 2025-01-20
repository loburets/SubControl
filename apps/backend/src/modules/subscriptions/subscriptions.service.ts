import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  Currency,
  Period,
  SubscriptionRequestDto,
  SubscriptionResponseDto,
} from '@subcontrol/shared-dtos/subscriptions';
import { addDays, subMonths, subYears } from 'date-fns';
import { Subscription } from '@prisma/client';
import { SubscriptionsCalculatorService } from './subscriptionsCalculator.service';
import { TransformersService } from '../transformers/transformers.service';

// some reasonable real-life limitation to avoid elements pagination for sake of simplicity
const takeMaxElements = 500;

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionsCalculatorService: SubscriptionsCalculatorService,
    private readonly transformersService: TransformersService
  ) {}

  async create(userId: number, createSubscriptionDto: SubscriptionRequestDto) {
    return this.prisma.subscription.create({
      data: { userId, ...createSubscriptionDto },
    });
  }

  async findAll({ userId }: { userId: number }) {
    return this.prisma.subscription.findMany({
      take: takeMaxElements,
      where: { userId, deletedAt: null },
    });
  }

  async findOne(id: number) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id, deletedAt: null },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async update(id: number, updateSubscriptionDto: SubscriptionRequestDto) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id, deletedAt: null },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return this.prisma.subscription.update({
      where: { id },
      data: updateSubscriptionDto,
    });
  }

  async remove(id: number) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id, deletedAt: null },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return this.prisma.subscription.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async checkSubscriptionCanBeRetrievedForUser(id: number, userId: number) {
    const subscription = await this.findOne(id);
    if (!subscription || subscription.userId !== userId) {
      throw new NotFoundException('Subscription not found');
    }
    return subscription;
  }

  async createDemoData(userId: number) {
    // some simple monthly subscription
    await this.create(userId, {
      name: 'Netflix',
      centsPerPeriod: 1099,
      startedAt: new Date(),
      period: Period.MONTHLY,
      currency: Currency.USD,
    });
    // some yearly subscription with payment soon
    await this.create(userId, {
      name: 'Spotify',
      centsPerPeriod: 6999,
      startedAt: addDays(subYears(new Date(), 3), 3),
      period: Period.YEARLY,
      currency: Currency.USD,
    });
    // some weekly subscription that was cancelled in the past
    await this.create(userId, {
      name: 'Amazon Prime',
      centsPerPeriod: 199,
      startedAt: addDays(subMonths(new Date(), 13), 3),
      period: Period.WEEKLY,
      currency: Currency.USD,
      cancelledAt: addDays(subMonths(new Date(), 3), 9),
    });
    // some subscription in the other currency
    await this.create(userId, {
      name: 'PlayStation Plus',
      centsPerPeriod: 60000,
      startedAt: addDays(subYears(new Date(), 3), 15),
      period: Period.MONTHLY,
      currency: Currency.TRY,
    });
  }

  transformToSubscriptionResponseDto(subscription: Subscription) {
    const calculatedData =
      this.subscriptionsCalculatorService.getSubscriptionCalculatedData(
        subscription
      );

    const result = { ...subscription, ...calculatedData };
    return this.transformersService.transformToResponseDto(
      result,
      SubscriptionResponseDto
    );
  }
}
