import { Controller, Get, Logger } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';

const isProduction = process.env.NODE_ENV === 'production';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly prisma: PrismaService) {}

  @ApiResponse({
    status: 200,
    description: 'API server works fine',
  })
  @Get('')
  async health() {
    const health: { health?: number }[] | undefined = await this.prisma
      .$queryRaw`SELECT 1+1 as health`;

    if (!health || health[0].health !== 2) {
      isProduction &&
        this.logger.error('Health check failed on DB level', { health });
      throw new Error('Health check failed');
    }

    this.logger.debug('Health check success');
    return;
  }
}
