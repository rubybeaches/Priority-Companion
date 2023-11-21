/*
  Warnings:

  - You are about to drop the column `description` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Habit` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frequency" TEXT,
    "rolesId" INTEGER NOT NULL,
    CONSTRAINT "Habit_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Habit" ("frequency", "id", "rolesId") SELECT "frequency", "id", "rolesId" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
