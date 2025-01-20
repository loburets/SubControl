import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/modules/users/users.service';
import { PrismaModule } from '../../src/prisma/prisma.module';

/**
 * Note: In more complex applications, it makes sense to write more unit tests for complex service methods,
 * but for the sake of simplicity, we will only test if the service is defined and rely on integration tests for the rest.
 */
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
