import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SubscriptionRequestDto } from '@subcontrol/shared-dtos/subscriptions';

// some reasonable real-life limitation to avoid elements pagination for sake of simplicity
const takeMaxElements = 500;

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSubscriptionDto: SubscriptionRequestDto) {
    return 'This action adds a new subscription';
  }

  findAll({ userId }: { userId: number }) {
    return this.prisma.subscription.findMany({
      take: takeMaxElements,
      where: { userId, deletedAt: null },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: SubscriptionRequestDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
