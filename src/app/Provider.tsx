"use client";
import { Toaster } from "@/components/Toast/toaster";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

const Provider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </NextThemesProvider>
  );
};

export default Provider;
