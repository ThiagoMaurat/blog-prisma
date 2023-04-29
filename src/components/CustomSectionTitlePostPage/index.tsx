import {
  Avatar,
  Flex,
  FlexProps,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Text } from "@chakra-ui/react";

interface CustomSectionTitlePostPage extends FlexProps {
  theme: string;
  title: string;
  date: string;
  author: string;
}

export const CustomSectionTitlePostPage = (
  props: CustomSectionTitlePostPage
) => {
  const { author, date, theme, title, ...rest } = props;

  return (
    <Flex
      backgroundColor={"#092856"}
      flexDir={{ base: "column", md: "row" }}
      {...rest}
    >
      <VStack
        minW={"162px"}
        align="flex-start"
        textAlign={{ base: "center", md: "unset" }}
        overflow="hidden"
        w="100%"
        maxW={{ base: "100%", md: "60%" }}
      >
        <Text fontWeight={"500"} color={"blue.300"} fontSize="1.2rem" w="100%">
          {theme}
        </Text>

        <Heading w="100%" fontSize={"3xl"} as={"h1"} color="whiteAlpha.900">
          {title}
        </Heading>
      </VStack>

      <HStack
        gap={"0.5rem"}
        h="100%"
        placeSelf={{ base: "center", md: "flex-start" }}
      >
        <Avatar
          name="Thiago Maurat"
          src="https://avatars.githubusercontent.com/u/76444984?v=4"
        />
        <Flex flexDir={"column"} gap="2px">
          <Text fontWeight="bold" color="whiteAlpha.800" fontSize="0.8rem">
            {author}
          </Text>
          <Text color="whiteAlpha.800" fontSize="0.7rem">
            {date}
          </Text>
        </Flex>
      </HStack>
    </Flex>
  );
};
