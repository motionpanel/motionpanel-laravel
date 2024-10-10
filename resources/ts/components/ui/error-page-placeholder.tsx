import { FrownIcon } from "lucide-react";

interface Props {
  children?: React.ReactNode;
}

export const ErrorPagePlaceholder = (props: Props) => {
  const { children } = props;
  return (
    <div className="relative">
      <div className="flex justify-center">{children}</div>
      <div className="flex justify-center">
        <FrownIcon className="w-16 h-16 text-gray-500" />
      </div>
    </div>
  );
};
