import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputProps,
} from "@chakra-ui/react";
import { Control, Controller, FieldError } from "react-hook-form";
import FieldInput from ".";

type FieldInputRegisterProps = {
  name: string;
  label?: string;
  error?: FieldError;
  helperText?: string | React.ReactNode;
  inputProps?: InputProps;
  control: Control<any>;
  defaultValue?: any;
} & InputProps;

export const FieldInputController: React.FC<FieldInputRegisterProps> = ({
  name,
  label,
  error,
  helperText,
  defaultValue,
  control,
  ...inputProps
}) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel
          fontFamily="Mulish"
          fontStyle="normal"
          fontWeight="600"
          fontSize="16px"
          lineHeight="20px"
          textAlign="left"
          letterSpacing="0.04em"
          color="#FFFFFF"
          htmlFor={name}
        >
          {label}
        </FormLabel>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FieldInput id={name} {...inputProps} {...field} />
        )}
      />

      {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
