import { Flex, FlexProps, useColorMode } from "@chakra-ui/react";

type NavBarContainerProps = {
  children: React.ReactNode;
} & FlexProps;

export const NavBarContainer = ({
  children,
  ...props
}: NavBarContainerProps) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      bg={colorMode === "dark" ? "gray.900" : "#FFFF"}
      position="sticky"
      w={"full"}
      zIndex="999"
      top={"0"}
      left="0"
    >
      <Flex
        maxW={{ base: "100%", md: "1200px" }}
        mx="auto"
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        p="7"
        color={["white", "white", "primary.700", "primary.700"]}
        {...props}
      >
        {children}
      </Flex>
    </Flex>
  );
};
