/*
  Warnings:

  - Added the required column `description` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themesId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "themesId" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Themes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Themes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_themesId_fkey" FOREIGN KEY ("themesId") REFERENCES "Themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
