import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function PageHeader(props: Props) {
  const { children, className } = props;
  return (
    <div
      className={cn(
        "h-14",
        "px-4",
        "border-b",
        "border-zinc-200",
        "flex",
        "items-center",
        className
      )}
    >
      {children}
    </div>
  );
}
