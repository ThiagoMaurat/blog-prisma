import { ReactNode } from "react";

type LimiterProps = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Limiter = (props: LimiterProps) => {
  const { children, ...rest } = props;
  return (
    <div {...rest} className="max-w-[1200px] w-full mx-auto px-3 sm:px-2">
      {children}
    </div>
  );
};
