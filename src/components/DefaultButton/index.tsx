import { FC, useMemo } from "react";

type Variants = "primary" | "secondary" | "ghost";

interface DefaultButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, Variants> {
  label: string;
  variant?: Variants;
  isLoading?: boolean;
}

export const DefaultButton: FC<DefaultButtonProps> = (
  props: DefaultButtonProps
) => {
  const { label, variant = "secondary", isLoading, ...rest } = props;

  const stylesByVariant = useMemo(() => {
    return {
      primary: "",
      secondary: `btn ${
        isLoading && "loading"
      } normal-case bg-blue-600 text-white hover:bg-blue-700 text-lg font-bold rounded-md h-10`,
      ghost:
        "bg-transparent border border-white text-white hover:bg-white hover:text-black text-lg font-bold rounded-md h-10",
    };
  }, [isLoading]);

  return (
    <button className={stylesByVariant[variant]} {...rest}>
      {label}
    </button>
  );
};
