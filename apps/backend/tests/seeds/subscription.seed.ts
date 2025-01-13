import {
  PrismaClient,
  Prisma,
  SubscriptionPeriod,
  Currency,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
import { seedUser } from './user.seed';

const prisma = new PrismaClient();

export async function seedSubscription(
  data: Partial<Prisma.SubscriptionCreateInput>
) {
  const defaultData: Prisma.SubscriptionCreateInput = {
    name: faker.lorem.sentence(),
    period: SubscriptionPeriod.MONTHLY,
    centsPerPeriod: faker.number.int(10000),
    currency: Currency.USD,
    startedAt: faker.date.past(),
    user: data.user
      ? data.user
      : ((await seedUser()) as Prisma.UserCreateNestedOneWithoutSubscriptionsInput),
    ...data,
  };

  return await prisma.subscription.create({
    data: defaultData,
  });
}
