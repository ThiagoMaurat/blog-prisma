import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

export const theme: ThemeConfig = extendTheme({
  initialColorMode: "dark",
  breakpoints: {
    xx: "1550px",
  },
  colors: {
    gray: {
      300: "#d1d5db",
      500: "#595B83",
      900: "#333456",
    },
    blue: {
      300: "#40ADF4",
      500: "#35A5F5",
      800: "#00006f",
    },
    darkblue: {
      700: "#030D40",
    },
    customgray: {
      500: "#BBBBBB",
    },
  },
  useSystemColorMode: true,
  components: {},
  styles: {
    global: (props: StyleFunctionProps) => ({
      "*": {
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
      },
      p: {
        fontFamily: `'Montserrat', sans-serif`,
      },
      h1: {
        fontFamily: `'Bebas Neue', cursive !important`,
      },
      h2: {
        fontFamily: `'Bebas Neue', cursive !important`,
      },
      h3: {
        fontFamily: `'Bebas Neue', cursive !important`,
      },
      "a, Link": {
        textDecoration: "none",
        fontFamily: `'Montserrat', sans-serif`,
      },
      li: {
        listStyle: "none",
      },
    }),
  },
});
