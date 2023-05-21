type NavBarContainerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const NavBarContainer = ({
  children,
  ...props
}: NavBarContainerProps) => {
  return (
    <div className="sticky flex w-full top-0 left-0">
      <nav
        className="sm:max-w-full md:max-w-[1200px] mx-auto w-full p-7 flex align-center justify-between flex-wrap"
        {...props}
      >
        {children}
      </nav>
    </div>
  );
};
