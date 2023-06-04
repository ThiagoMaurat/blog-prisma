import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import FieldTextArea from "./index";

type FieldTextAreaControllerProps = {
  name: string;
  label?: string;
  error?: FieldError;
  helperText?: string | React.ReactNode;
  control: Control<any>;
  defaultValue?: any;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export const FieldTextAreaController: React.FC<
  FieldTextAreaControllerProps
> = ({
  name,
  label,
  error,
  helperText,
  defaultValue,
  control,
  ...textAreaProps
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
          <FieldTextArea id={name} {...textAreaProps} {...field} />
        )}
      />

      {helperText && !error && <p>{helperText}</p>}

      {!!error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};
