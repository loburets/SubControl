import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, SubscriptionsModule, UsersModule, AuthModule],
})
export class AppModule {}
