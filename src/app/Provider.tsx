"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@chakra-ui/react";
import { theme } from "../../styles/theme";

interface Props {
  children: React.ReactNode;
}

const Provider = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};

export default Provider;
