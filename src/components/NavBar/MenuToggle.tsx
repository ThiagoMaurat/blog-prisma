import { Box, useColorMode } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";

type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
};

export const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? (
        <IoClose
          fontSize={"1.5rem"}
          cursor={"pointer"}
          color={colorMode === "light" ? "#333456" : "white"}
        />
      ) : (
        <MdOutlineMenu
          color={colorMode === "light" ? "#333456" : "white"}
          fontSize={"1.5rem"}
          cursor={"pointer"}
        />
      )}
    </Box>
  );
};
