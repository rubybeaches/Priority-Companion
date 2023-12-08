-- CreateEnum
CREATE TYPE "chronoType" AS ENUM ('peak', 'trough', 'recovery');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" SERIAL NOT NULL,
    "frequency" TEXT,
    "rolesId" INTEGER NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Initiative" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "durationCount" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "rolesId" INTEGER NOT NULL,

    CONSTRAINT "Initiative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goals" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "initiativeId" INTEGER NOT NULL,

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT,
    "estTime" INTEGER,
    "chronoType" "chronoType",
    "plannedStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueBy" TIMESTAMP(3),
    "link" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "habitId" INTEGER,
    "initiativeId" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Initiative" ADD CONSTRAINT "Initiative_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative"("id") ON DELETE SET NULL ON UPDATE CASCADE;
