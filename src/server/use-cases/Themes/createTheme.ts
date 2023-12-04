import { Themes } from "@prisma/client";
import { ThemeRepository } from "@/server/repositories/theme-repository";

interface ThemeCreateUseCaseRequest {
  name: string;
}

export interface ThemeCreateUseCaseOutput {
  theme: Themes;
}

export class CreateThemeUseCase {
  constructor(private themeRepository: ThemeRepository) {}

  async execute({
    name,
  }: ThemeCreateUseCaseRequest): Promise<ThemeCreateUseCaseOutput> {
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
