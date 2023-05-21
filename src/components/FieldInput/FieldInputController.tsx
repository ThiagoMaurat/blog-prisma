import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import FieldInput from "./index";

type FieldInputRegisterProps = {
  name: string;
  label?: string;
  error?: FieldError;
  helperText?: string | React.ReactNode;
  control: Control<any>;
  defaultValue?: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

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
    <div className="flex flex-col gap-2">
      {!!label && (
        <label className="font-semibold text-left text-base" htmlFor={name}>
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FieldInput id={name} {...inputProps} {...field} />
        )}
      />

      {helperText && !error && <p>{helperText}</p>}

      {!!error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};
