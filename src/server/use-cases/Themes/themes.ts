import { Themes } from "@prisma/client";
import { ThemeRepository } from "@/server/repositories/theme-repository";

interface ThemeUseCaseRequest {
  name: string;
}

interface ThemeUseCaseResponse {
  theme: Themes;
}

export class ThemeUseCase {
  constructor(private themeRepository: ThemeRepository) {}

  async execute({ name }: ThemeUseCaseRequest): Promise<ThemeUseCaseResponse> {
    const theme = await this.themeRepository.create({
      name,
    });

    if (!theme) {
      throw new Error("Theme not created");
    }

    return { theme };
  }

  async listAll(page?: number, limit?: number) {
    return this.themeRepository.findAll(page, limit);
  }
}
