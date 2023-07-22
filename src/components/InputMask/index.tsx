import * as React from "react";

import { cn } from "@/lib/utils";
import InputMask, { ReactInputMask, Props } from "react-input-mask";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  mask: string | (string | RegExp)[];
};

const InputFieldMask = React.forwardRef<ReactInputMask, InputProps>(
  ({ className, mask, type, ...props }, ref) => {
    return (
      <InputMask
        mask={mask}
        type={type}
        className={cn(
          (className =
            "bg-[#E1F5FE] px-3 text-black rounded-lg h-10 w-full focus:outline-blue-500"),
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);
InputFieldMask.displayName = "InputFieldMask";

export { InputFieldMask };
