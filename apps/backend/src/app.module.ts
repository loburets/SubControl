import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    PrismaModule,
    SubscriptionsModule,
    UsersModule,
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}
