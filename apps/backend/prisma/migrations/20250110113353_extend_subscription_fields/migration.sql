/*
  Warnings:

  - Added the required column `centsPerPeriod` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionPeriod" AS ENUM ('YEARLY', 'MONTHLY', 'WEEKLY');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'RUB', 'TRY', 'OTHER');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "centsPerPeriod" INTEGER NOT NULL,
ADD COLUMN     "currency" "Currency" NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "period" "SubscriptionPeriod" NOT NULL,
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
