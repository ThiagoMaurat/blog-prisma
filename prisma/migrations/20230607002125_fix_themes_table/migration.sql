-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_themesId_fkey";

-- CreateTable
CREATE TABLE "PostThemes" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "themesId" TEXT NOT NULL,

    CONSTRAINT "PostThemes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostThemes" ADD CONSTRAINT "PostThemes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostThemes" ADD CONSTRAINT "PostThemes_themesId_fkey" FOREIGN KEY ("themesId") REFERENCES "Themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
