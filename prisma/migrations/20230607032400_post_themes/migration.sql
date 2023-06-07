/*
  Warnings:

  - You are about to drop the `PostThemes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostThemes" DROP CONSTRAINT "PostThemes_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostThemes" DROP CONSTRAINT "PostThemes_themesId_fkey";

-- DropTable
DROP TABLE "PostThemes";

-- CreateTable
CREATE TABLE "posts_themes" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "themesId" TEXT NOT NULL,

    CONSTRAINT "posts_themes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts_themes" ADD CONSTRAINT "posts_themes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_themes" ADD CONSTRAINT "posts_themes_themesId_fkey" FOREIGN KEY ("themesId") REFERENCES "Themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
