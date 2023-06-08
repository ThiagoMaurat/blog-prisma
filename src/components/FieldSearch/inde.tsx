"use client";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import React, { ForwardRefRenderFunction } from "react";
import { BsSearch } from "react-icons/bs";

interface FieldSearchComponentProps extends InputProps {
  name: string;
}

const FieldSearchComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  FieldSearchComponentProps
> = (props, ref) => {
  const { colorMode } = useColorMode();

  return (
    <Stack w="300px">
      <InputGroup>
        <InputLeftElement
          h={"100%"}
          position={"absolute"}
          left="1.6%"
          pointerEvents="none"
          fontSize="1.2em"
        >
          <BsSearch color="black" />
        </InputLeftElement>
        <Input
          pl="55px !important"
          borderRadius={"24px"}
          h="45px"
          w="100%"
          backgroundColor={"#FFFF"}
          color={colorMode === "light" ? "gray.900" : "gray.900"}
          placeholder="Search (mínimo 3 caracteres)"
          ref={ref}
          {...props}
        />
      </InputGroup>
    </Stack>
  );
};

export const FieldSearch = React.forwardRef(FieldSearchComponent);
