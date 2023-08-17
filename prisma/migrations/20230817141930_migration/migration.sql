-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL DEFAULT '',
    "Email" TEXT NOT NULL DEFAULT '',
    "Password" TEXT NOT NULL DEFAULT '',
    "RoomId" INTEGER
);
INSERT INTO "new_Users" ("Email", "Name", "Password", "RoomId", "id") SELECT "Email", "Name", "Password", "RoomId", "id" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");
CREATE UNIQUE INDEX "Users_Password_key" ON "Users"("Password");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
