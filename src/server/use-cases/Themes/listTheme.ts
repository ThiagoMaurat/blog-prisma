import { Themes } from "@prisma/client";
import { ThemeRepository } from "@/server/repositories/theme-repository";

interface ThemeListUseCaseRequest {
  page?: number;
  limit?: number;
}

export interface ThemeListUseCaseOutput {
  theme: Themes[];
}

export class ListThemeUseCase {
  constructor(private themeRepository: ThemeRepository) {}

  async execute({
    page,
    limit,
  }: ThemeListUseCaseRequest): Promise<ThemeListUseCaseOutput> {
    const themes = await this.themeRepository.findAll(page, limit);

    if (!themes) {
      throw new Error("Não há tema criados");
    }

    return {
      theme: themes,
    };
  }
}
