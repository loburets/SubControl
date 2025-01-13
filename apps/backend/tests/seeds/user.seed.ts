import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { AuthService } from '../../src/modules/auth/auth.service';

const prisma = new PrismaClient();

export async function seedUser(
  authService: AuthService,
  data: Partial<Prisma.UserCreateInput> = {}
) {
  const defaultData: Prisma.UserCreateInput = {
    email: faker.internet.email(),
    subscriptions: data.subscriptions || {
      create: [],
    },
    ...data,
    password: await authService.hashPassword(
      data.password ? data.password : faker.internet.password()
    ),
  };

  return await prisma.user.create({
    data: defaultData,
  });
}
