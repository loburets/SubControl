import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedUser(data: Partial<Prisma.UserCreateInput> = {}) {
  const defaultData: Prisma.UserCreateInput = {
    email: faker.internet.email(),
    subscriptions: data.subscriptions || {
      create: [],
    },
    password: faker.internet.password(),
    ...data,
  };

  return await prisma.user.create({
    data: defaultData,
  });
}
