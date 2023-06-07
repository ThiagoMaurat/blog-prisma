/*
  Warnings:

  - The primary key for the `PostThemes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PostThemes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "publishedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PostThemes" DROP CONSTRAINT "PostThemes_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PostThemes_pkey" PRIMARY KEY ("postId", "themesId");
