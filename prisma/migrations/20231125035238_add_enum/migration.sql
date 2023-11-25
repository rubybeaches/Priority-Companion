/*
  Warnings:

  - The `chronoType` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "chronoType" AS ENUM ('peak', 'trough', 'analytical');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "chronoType",
ADD COLUMN     "chronoType" "chronoType";
