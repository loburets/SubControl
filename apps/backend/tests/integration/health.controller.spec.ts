import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { HealthController } from '../../src/modules/health/health.controller';

describe('AuthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('health', () => {
    it('should show that service is ready', async () => {
      const response = await controller.health();

      expect(response).toBeUndefined();
    });

    it('should throw an error if service is not ready', async () => {
      jest
        .spyOn(controller['prisma'], '$queryRaw')
        .mockResolvedValue([{ health: 1 }]);

      await expect(controller.health()).rejects.toThrowError(
        'Health check failed'
      );
    });
  });
});
