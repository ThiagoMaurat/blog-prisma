"use client";
import {
  Avatar,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { letterCounter } from "../../helpers/charactersCount";
import { format, parseISO } from "date-fns";
import { PostResponse } from "@/@types/PostResponse";

type FirstCardProps = {
  data: PostResponse;
  href: string;
};
function FirstCard(props: FirstCardProps) {
  const { data, href } = props;

  const { author, publishedAt, description, thumbnail, themes, title } = data;
  console.log(publishedAt);
  return (
    <Link href={href}>
      <Grid gridTemplateColumns={"1fr 1fr"} gap="2rem">
        <GridItem>
          <Image
            borderRadius={"3xl"}
            h="40vh"
            alt="last-post-thumbnail"
            src={thumbnail}
            objectFit="cover"
          />
        </GridItem>

        <GridItem
          py="15px"
          display={"flex"}
          flexDirection={"column"}
          gap="1rem"
        >
          {themes.map((theme, index) => {
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

          <Text fontWeight="bold" color="darkblue.700" fontSize="1.5rem">
            {title}
          </Text>

          <Text color={"gray.600"} fontWeight="600" fontSize="0.9rem">
            {letterCounter(description, 300)}
          </Text>

          <HStack gap={"0.5rem"}>
            <Avatar
              name="Thiago Maurat"
              src="https://avatars.githubusercontent.com/u/76444984?v=4"
            />
            <Flex flexDir={"column"} gap="2px">
              <Text fontWeight="bold" color="darkblue.700" fontSize="0.8rem">
                {author.name}
              </Text>

              {publishedAt && (
                <Text color={"gray.900"} fontSize="0.7rem">
                  {format(parseISO(publishedAt), "dd/MM/yyyy")}
                </Text>
              )}
            </Flex>
          </HStack>
        </GridItem>
      </Grid>
    </Link>
  );
}

export default FirstCard;
