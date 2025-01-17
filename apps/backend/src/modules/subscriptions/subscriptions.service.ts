import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SubscriptionRequestDto } from '@subcontrol/shared-dtos/subscriptions';

// some reasonable real-life limitation to avoid elements pagination for sake of simplicity
const takeMaxElements = 500;

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

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
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return subscription;
  }

  async update(id: number, updateSubscriptionDto: SubscriptionRequestDto) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id, deletedAt: null },
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
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
      throw new NotFoundException(`Subscription with ID ${id} not found`);
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
}
