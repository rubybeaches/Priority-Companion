/*
  Warnings:

  - You are about to drop the column `prioritySquare` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "prioritySquare",
ADD COLUMN     "priority" "prioritySquare";
