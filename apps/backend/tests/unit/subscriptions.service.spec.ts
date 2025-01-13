import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsService } from '../../src/modules/subscriptions/subscriptions.service';
import { PrismaModule } from '../../src/prisma/prisma.module';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionsService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
