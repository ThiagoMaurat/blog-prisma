import { PrismaThemeRepository } from "../repositories/prisma/theme-repository";
import { CreateThemeUseCase } from "../use-cases/Themes/createTheme";

export function makeCreateThemeUseCase() {
  const prismaUsersRepository = new PrismaThemeRepository();
  const themeUseCase = new CreateThemeUseCase(prismaUsersRepository);

  return themeUseCase;
}
