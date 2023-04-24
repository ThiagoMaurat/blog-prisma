import { Box, Flex, HStack, Stack, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { useCallback } from "react";
import ToggleButtonDarkMode from "../ToogleButtonDarkMode";

type MenuLinksProps = {
  isOpen: boolean;
  isLoading?: boolean;
};

export const MenuLinks = ({ isOpen, isLoading }: MenuLinksProps) => {
  const { colorMode } = useColorMode();
  const { asPath } = useRouter();

  const CheckRouterMatchesLabel = useCallback(
    (label: string) => {
      if (asPath.includes(label.toLowerCase())) {
        return true;
      } else if (asPath === "/" && label === "Home") {
        return true;
      }
      return false;
    },
    [asPath]
  );

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      w="55%"
    >
      <Flex
        gap={6}
        align={"center"}
        justify={["center", "space-between"]}
        direction={["column", "column", "row", "row"]}
        pt={[8, 8, 0, 0]}
        color={colorMode === "dark" ? "whiteAlpha.900" : "gray.900"}
      >
        <Flex gap={8} align={"center"} flexDir={{ base: "column", md: "row" }}>
          <Link
            href={"/"}
            style={
              CheckRouterMatchesLabel("Home")
                ? {
                    borderBottom: "1px solid #35A5F5",
                    borderBottomWidth: "3px",
                    color: "gray.300",
                    fontWeight: "600",
                  }
                : undefined
            }
            className={styles.linkMenu}
          >
            Home
          </Link>

          <Link
            href={"/blog"}
            style={
              CheckRouterMatchesLabel("Blog")
                ? {
                    borderBottom: "1px solid #35A5F5",
                    borderBottomWidth: "3px",
                    color: "gray.300",
                    fontWeight: "600",
                  }
                : undefined
            }
            className={styles.linkMenu}
          >
            Blog
          </Link>
        </Flex>
        <HStack justify={"center"}>
          <ToggleButtonDarkMode />
        </HStack>
      </Flex>
    </Box>
  );
};
