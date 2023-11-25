/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `Habit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskId` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_habitId_fkey";

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "taskId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Habit_taskId_key" ON "Habit"("taskId");

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
