/*
  Warnings:

  - The values [analytical] on the enum `chronoType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "chronoType_new" AS ENUM ('peak', 'trough', 'creative');
ALTER TABLE "Task" ALTER COLUMN "chronoType" TYPE "chronoType_new" USING ("chronoType"::text::"chronoType_new");
ALTER TYPE "chronoType" RENAME TO "chronoType_old";
ALTER TYPE "chronoType_new" RENAME TO "chronoType";
DROP TYPE "chronoType_old";
COMMIT;
