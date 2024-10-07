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
        "p-4 shadow-[0px_10px_5px_-10px] shadow-zinc-300",
        className
      )}
    >
      {children}
    </div>
  );
}
