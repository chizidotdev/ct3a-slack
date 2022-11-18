/*
  Warnings:

  - You are about to drop the column `userId` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "userId",
ALTER COLUMN "public" SET DEFAULT true;
