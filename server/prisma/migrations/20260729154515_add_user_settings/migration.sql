/*
  Warnings:

  - You are about to drop the column `notifications` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "notifications",
ADD COLUMN     "pushNotifications" BOOLEAN NOT NULL DEFAULT true;
