"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import {
  ListThemeSchemaType,
  ListThemeTypeOutput,
  paginationSchema,
} from "./schema.";
import { makeListThemeUseCase } from "@/server/factories/make-list-theme-use-case";

const handler = async (
  data: ListThemeSchemaType
): Promise<ListThemeTypeOutput> => {
  const themeUseCase = makeListThemeUseCase();

  const themes = await themeUseCase.execute(data);

  return {
    data: themes,
  };
};

export const getListThemesAction = createSafeAction(paginationSchema, handler);
