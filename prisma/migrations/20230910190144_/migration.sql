/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `Message` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `RoomId` on the `Users` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "rooms" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("authorId", "id") SELECT "authorId", "id" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "roomsn" TEXT,
    CONSTRAINT "Users_roomsn_fkey" FOREIGN KEY ("roomsn") REFERENCES "rooms" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("id") SELECT "id" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
CREATE UNIQUE INDEX "Users_password_key" ON "Users"("password");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "rooms_name_key" ON "rooms"("name");
