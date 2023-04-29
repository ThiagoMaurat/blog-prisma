import { useColorMode } from "@chakra-ui/react";
import React, { useMemo } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

export default function ToggleButtonDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  const toggleDarkMode = useMemo((): boolean | undefined => {
    if (colorMode === "light") {
      return true;
    } else {
      return false;
    }
  }, [colorMode]);

  return (
    <DarkModeToggle
      onChange={toggleColorMode}
      checked={toggleDarkMode}
      size={61}
    />
  );
}
