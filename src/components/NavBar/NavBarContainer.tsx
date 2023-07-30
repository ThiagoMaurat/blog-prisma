type NavBarContainerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const NavBarContainer = ({
  children,
  ...props
}: NavBarContainerProps) => {
  return (
    <div className="flex w-full min-h-[95px] h-auto top-0 left-0 px-2">
      <nav
        className="md:max-w-full mx-auto w-full py-7 flex align-center justify-between flex-wrap"
        {...props}
      >
        {children}
      </nav>
    </div>
  );
};
