import { Avatar, Flex, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Themes } from "@prisma/client";

interface CardProps {
  image: string;
  theme: {
    themes: Themes;
  }[];
  title: string;
  description: string;
  author: string;
  date: string;
  href: string;
}

export function Card(props: CardProps) {
  const { author, date, href, description, image, theme, title } = props;
  return (
    <Link href={href}>
      <Flex
        maxW="360px"
        w="100%"
        gap="1rem"
        cursor={"pointer"}
        flexDir="column"
      >
        <Flex position={"relative"} width={360} height={250}>
          <Image
            style={{ borderRadius: "15px" }}
            src={image}
            alt="image all posts"
            fill
          />
        </Flex>

        <Text fontWeight={"500"} color={"blue.300"} fontSize="1.2rem">
          {theme.map((theme, index) => {
            return (
              <Text
                key={`theme-${index}`}
                fontWeight={"500"}
                color={"blue.300"}
                fontSize="1.2rem"
              >
                {theme.themes.name}
              </Text>
            );
          })}
        </Text>

        <Text fontWeight="bold" color="darkblue.700" fontSize="1.5rem">
          {title}
        </Text>

        <Text color={"gray.600"} fontWeight="600" fontSize="0.9rem">
          {description}
        </Text>

        <HStack gap={"0.5rem"}>
          <Avatar
            name="Thiago Maurat"
            src="https://avatars.githubusercontent.com/u/76444984?v=4"
          />
          <Flex flexDir={"column"} gap="2px">
            <Text fontWeight="bold" color="darkblue.700" fontSize="0.8rem">
              {author}
            </Text>
            <Text color={"gray.900"} fontSize="0.7rem">
              {date}
            </Text>
          </Flex>
        </HStack>
      </Flex>
    </Link>
  );
}
