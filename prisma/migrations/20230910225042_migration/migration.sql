/*
  Warnings:

  - Added the required column `roomName` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL DEFAULT '',
    "roomName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "rooms" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("createdAt", "id", "message") SELECT "createdAt", "id", "message" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
