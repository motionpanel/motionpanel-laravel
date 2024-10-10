import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

interface Props {
  className?: string;
}

export function CircleSpinning(props: Props) {
  const { className } = props;
  return (
    <div
      className={cn([
        "text-purple-800",
        "inline-flex",
        "justify-center",
        className,
      ])}
    >
      <LoaderCircleIcon className="w-6 h-6 animate-spin" />
    </div>
  );
}
