import { PrismaThemeRepository } from "../repositories/prisma/theme-repository";
import { ListThemeUseCase } from "../use-cases/Themes/listTheme";

export function makeListThemeUseCase() {
  const prismaUsersRepository = new PrismaThemeRepository();
  const themeListUseCase = new ListThemeUseCase(prismaUsersRepository);

  return themeListUseCase;
}
