/*
  Warnings:

  - A unique constraint covering the columns `[roomName]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Message_roomName_key" ON "Message"("roomName");
