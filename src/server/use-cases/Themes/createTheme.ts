import { Themes } from "@prisma/client";
import { ThemeRepository } from "@/server/repositories/theme-repository";
import { UserIsNotAdminError } from "@/server/errors/user-is-not-admin-error";

interface ThemeCreateUseCaseInput {
  name: string;
  role: string;
}

export interface ThemeCreateUseCaseOutput {
  theme: Themes;
}

export class CreateThemeUseCase {
  constructor(private themeRepository: ThemeRepository) {}

  async execute({
    name,
    role,
  }: ThemeCreateUseCaseInput): Promise<ThemeCreateUseCaseOutput> {
    if (role !== "admin") {
      throw new UserIsNotAdminError();
    }

    const theme = await this.themeRepository.create({
      name,
    });

    if (!theme) {
      throw new Error("Theme not created");
    }

    return { theme };
  }

  async findAll(page?: number, limit?: number) {
    return this.themeRepository.findAll(page, limit);
  }
}
