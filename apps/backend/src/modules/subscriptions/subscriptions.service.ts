import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from '../../prisma/prisma.service';

// some reasonable real-life limitation to avoid elements pagination for sake of simplicity
const takeMaxElements = 500;

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return 'This action adds a new subscription';
  }

  findAll() {
    return this.prisma.subscription.findMany({ take: takeMaxElements });
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
