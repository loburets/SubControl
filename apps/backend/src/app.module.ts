import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';

@Module({
  imports: [PrismaModule, SubscriptionsModule],
})
export class AppModule {}
