import { Button, ButtonProps } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import React from "react";

type Variants = "primary" | "secondary" | "ghost";

interface DefaultButtonProps extends Omit<ButtonProps, Variants> {
  label: string;
  variant?: Variants;
}

export const DefaultButton: FC<DefaultButtonProps> = (
  props: DefaultButtonProps
) => {
  const { label, variant = "secondary", ...rest } = props;

  const stylesByVariant = useMemo((): Record<Variants, ButtonProps> => {
    return {
      primary: {},
      secondary: {
        backgroundColor: "#445FF4",
        color: "#FFF",
        _hover: {
          background: "#405ae9",
        },
        fontSize: "16px",
        fontWeight: 700,
        borderRadius: "8px",
        height: "40px",
        lineHeight: "20px",
        border: "none",
        width: "100%",
      },
      ghost: {
        backgroundColor: "inherit",
        borderRadius: "8px",
        height: "42px",
        border: "1px solid #FFFFFF",
        color: "#FFFF",
        lineHeight: "20px",
        _hover: {
          background: "inherit",
        },
      },
    };
  }, []);

  return (
    <Button {...stylesByVariant[variant]} {...rest}>
      {label}
    </Button>
  );
};
