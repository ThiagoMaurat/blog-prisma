import { IoClose } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";

type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
};

export const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <div className="block md:hidden items-center self-center" onClick={toggle}>
      {isOpen ? (
        <IoClose fontSize={"1.5rem"} cursor={"pointer"} color={"#333456"} />
      ) : (
        <MdOutlineMenu
          color={"#333456"}
          fontSize={"1.5rem"}
          cursor={"pointer"}
        />
      )}
    </div>
  );
};
