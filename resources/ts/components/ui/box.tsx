import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export function Box(props: Props) {
  const { children, className } = props;
  return (
    <div
      className={cn(
        "bg-zinc-50",
        "border",
        "border-solid",
        "border-l-zinc-200",
        "shadow-[0px_2px_5px_-1px_rgba(50,50,93,0.25)_0px_1px_3px_-1px_rgba(0,0,0,0.3)]",
        "rounded-sm",
        "p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
