import { FC, useMemo } from "react";
import clsx from "clsx";
type Variants = "primary" | "secondary" | "ghost";

interface DefaultButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, Variants> {
  label: string;
  variant?: Variants;
  isLoading?: boolean;
  rightIcon?: React.ReactNode;
  className?: string;
}

export const DefaultButton: FC<DefaultButtonProps> = (
  props: DefaultButtonProps
) => {
  const {
    label,
    className,
    variant = "secondary",
    rightIcon,
    isLoading,
    ...rest
  } = props;

  const stylesByVariant = useMemo(() => {
    return {
      primary: clsx(
        "normal-case",
        "hover:bg-slate-400",
        "text-lg",
        "font-bold",
        "rounded-md",
        "text-white",
        "h-10",
        "flex",
        "items-center",
        "gap-2",
        "justify-center",
        "bg-slate-500",
        props.className
      ),
      secondary: clsx(
        "normal-case",
        "bg-blue-600",
        "text-white",
        "hover:bg-blue-700",
        "text-lg",
        "font-bold",
        "rounded-md",
        "h-10",
        props.className
      ),
      ghost: clsx(
        "bg-transparent",
        "border",
        "border-white",
        "text-white",
        "hover:bg-white",
        "hover:text-black",
        "text-lg",
        "font-bold",
        "rounded-md",
        "h-10",
        props.className
      ),
    };
  }, [props.className]);

  return (
    <button className={stylesByVariant[variant]} {...rest}>
      {rightIcon && rightIcon}
      {label}
    </button>
  );
};
