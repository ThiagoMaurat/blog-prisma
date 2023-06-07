import { Prisma, Themes } from "@prisma/client";

export interface ThemeRepository {
  create(data: Prisma.ThemesCreateInput): Promise<Themes>;
  find(id: string): Promise<Themes | null>;
  findAll(page?: number, limit?: number): Promise<Themes[]>;
}
