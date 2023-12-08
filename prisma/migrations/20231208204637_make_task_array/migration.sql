/*
  Warnings:

  - You are about to drop the column `taskId` on the `Habit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_taskId_fkey";

-- DropIndex
DROP INDEX "Habit_taskId_key";

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "taskId";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "habitId" INTEGER;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
