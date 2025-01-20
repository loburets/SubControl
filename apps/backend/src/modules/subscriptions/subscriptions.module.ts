import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsCalculatorService } from './subscriptionsCalculator.service';
import { TransformersModule } from '../transformers/transformers.module';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsCalculatorService],
  exports: [SubscriptionsService],
  imports: [TransformersModule],
})
export class SubscriptionsModule {}
