import { Button, ButtonProps } from "@chakra-ui/react";
import React, { forwardRef, ForwardRefRenderFunction } from "react";

type ButtonThemeProps = {} & ButtonProps;

const ButtonChakra: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonThemeProps
> = (props, ref) => {
  return <Button _hover={{ background: 'blue.300' }} color={'white'} backgroundColor="blue.500" borderRadius={'3xl'} {...props} ref={ref} />;
};

export const ButtonTheme = forwardRef(ButtonChakra);
