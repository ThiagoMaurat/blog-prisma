import { FC, useMemo } from "react";

type Variants = "primary" | "secondary" | "ghost";

interface DefaultButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, Variants> {
  label: string;
  variant?: Variants;
  isLoading?: boolean;
  rightIcon?: React.ReactNode;
}

export const DefaultButton: FC<DefaultButtonProps> = (
  props: DefaultButtonProps
) => {
  const { label, variant = "secondary", rightIcon, isLoading, ...rest } = props;

  const stylesByVariant = useMemo(() => {
    return {
      primary: `btn ${
        isLoading && "loading"
      } normal-case hover:btn-bg-gray-300 btn-text-lg btn-font-bold btn-rounded-md btn-h-10 flex gap-2 justify-center btn-bg-gray-400`,
      secondary: `btn ${
        isLoading && "loading"
      } normal-case bg-blue-600 text-white hover:bg-blue-700 btn-text-lg font-bold rounded-md h-10`,
      ghost:
        "bg-transparent border border-white text-white hover:bg-white hover:text-black text-lg font-bold rounded-md h-10",
    };
  }, [isLoading]);

  return (
    <button className={stylesByVariant[variant]} {...rest}>
      {rightIcon && rightIcon}
      {label}
    </button>
  );
};
