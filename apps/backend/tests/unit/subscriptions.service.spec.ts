import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsService } from '../../src/modules/subscriptions/subscriptions.service';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { TransformersModule } from '../../src/modules/transformers/transformers.module';
import { SubscriptionsCalculatorService } from '../../src/modules/subscriptions/subscriptionsCalculator.service';

/**
 * Note: In more complex applications, it makes sense to write more unit tests for complex service methods,
 * but for the sake of simplicity, we will only test if the service is defined and rely on integration tests for the rest.
 */
describe('SubscriptionsService', () => {
  let service: SubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionsService, SubscriptionsCalculatorService],
      imports: [PrismaModule, TransformersModule],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
