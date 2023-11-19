-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT,
    "estTime" INTEGER,
    "chronoType" TEXT,
    "plannedStart" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueBy" DATETIME,
    "link" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("chronoType", "description", "dueBy", "estTime", "id", "link", "plannedStart", "priority", "title", "userId") SELECT "chronoType", "description", "dueBy", "estTime", "id", "link", "plannedStart", "priority", "title", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
