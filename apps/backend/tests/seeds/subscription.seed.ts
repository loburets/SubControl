import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSubscription(data: Prisma.SubscriptionCreateInput) {
  return await prisma.user.create({
    data,
  });
}
