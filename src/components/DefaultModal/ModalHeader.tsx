import { DoorClosed } from "lucide-react";
import { FC } from "react";

interface ModalHeaderProps {
  title?: string;
  onIconClick?: () => void;
}

const ModalHeader: FC<ModalHeaderProps> = (props: ModalHeaderProps) => {
  const { title, onIconClick } = props;

  return (
    <header className="w-full py-3 flex justify-between">
      <p className="text-xl font-bold">{title}</p>

      <DoorClosed
        color="black"
        onClick={onIconClick}
        cursor={"pointer"}
        fontSize={"1.3rem"}
      />
    </header>
  );
};

export default ModalHeader;
