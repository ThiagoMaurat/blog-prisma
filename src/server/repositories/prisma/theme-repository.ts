import { prisma } from "@/lib/prisma";
import { Prisma, Themes } from "@prisma/client";
import { ThemeRepository } from "../theme-repository";

export class PrismaThemeRepository implements ThemeRepository {
  async create(data: Prisma.ThemesCreateInput): Promise<Themes> {
    const createTheme = await prisma.themes.create({
      data: {
        name: data.name,
      },
    });

    if (!createTheme) {
      throw new Error("Couldnt create theme");
    }

    return createTheme;
  }

  async find(id: string): Promise<Themes | null> {
    const theme = await prisma.themes.findUnique({
      where: {
        id,
      },
    });

    return theme;
  }

  async findAll(page?: number, limit?: number): Promise<Themes[]> {
    const pageSizeFindAll = limit ?? 0;
    const pageFindAll = page ?? 9999999;

    const offset = (pageFindAll - 1) * pageSizeFindAll;

    const themes = await prisma.themes.findMany({
      skip: offset,
      take: limit ? pageSizeFindAll : undefined,
      select: {
        id: true,
        name: true,
      },
    });

    return themes;
  }
}
