/*
  Warnings:

  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Roles" ("description", "id", "name") SELECT "description", "id", "name" FROM "Roles";
DROP TABLE "Roles";
ALTER TABLE "new_Roles" RENAME TO "Roles";
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT,
    "estTime" INTEGER,
    "chronoType" TEXT,
    "plannedStart" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueBy" DATETIME,
    "link" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "habitId" INTEGER,
    "initiativeId" INTEGER,
    CONSTRAINT "Task_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("chronoType", "completed", "description", "dueBy", "estTime", "habitId", "id", "initiativeId", "link", "name", "plannedStart", "priority") SELECT "chronoType", "completed", "description", "dueBy", "estTime", "habitId", "id", "initiativeId", "link", "name", "plannedStart", "priority" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
