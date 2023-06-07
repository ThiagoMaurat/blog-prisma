import { PrismaThemeRepository } from "../repositories/prisma/theme-repository";
import { ThemeUseCase } from "../use-cases/Themes/themes";

export function makeThemeUseCase() {
  const prismaUsersRepository = new PrismaThemeRepository();
  const themeUseCase = new ThemeUseCase(prismaUsersRepository);

  return themeUseCase;
}
