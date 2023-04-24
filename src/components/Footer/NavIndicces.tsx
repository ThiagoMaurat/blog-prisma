import Link from "next/link";
import { HStack, Text, TextProps } from "@chakra-ui/react";
import { IconType, IconBase } from "react-icons";
import { useState } from "react";

interface NavIndicesProps extends TextProps {
  text: string;
  href: string;
  isExternal: boolean;
  LeftIcon?: IconType;
}

export const NavIndices = ({
  isExternal,
  text,
  href,
  LeftIcon,
}: NavIndicesProps) => {
  const [enterElement, setEnterElement] = useState(false);

  if (isExternal) {
    return (
      <a
        onMouseLeave={() => setEnterElement(false)}
        onMouseEnter={() => setEnterElement(true)}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <HStack>
          <>
            {LeftIcon && (
              <LeftIcon color={enterElement ? "#35A5F5" : "#2D3748"} />
            )}
            <Text
              fontWeight={"500"}
              color={"gray.700"}
              fontSize="1rem"
              _hover={
                enterElement ? { color: "#35A5F5" } : { color: "#2D3748" }
              }
            >
              {text}
            </Text>
          </>
        </HStack>
      </a>
    );
  }

  if (!isExternal) {
    return (
      <Link
        href={href}
        onMouseLeave={() => setEnterElement(false)}
        onMouseEnter={() => setEnterElement(true)}
      >
        <HStack>
          <>
            {LeftIcon && (
              <LeftIcon color={enterElement ? "#35A5F5" : "#2D3748"} />
            )}
            <Text
              fontWeight={"500"}
              color={"gray.700"}
              fontSize="1rem"
              _hover={
                enterElement ? { color: "#35A5F5" } : { color: "#2D3748" }
              }
            >
              {text}
            </Text>
          </>
        </HStack>
      </Link>
    );
  }

  return null;
};
