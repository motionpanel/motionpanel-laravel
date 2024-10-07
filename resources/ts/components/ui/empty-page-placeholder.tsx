import EmptyListSvg from "../../../assets/empty-list-2.svg?react";

interface Props {
  children: React.ReactNode;
}

export function EmptyPagePlaceholder(props: Props) {
  const { children } = props;
  return (
    <div className="relative">
      <div className="absolute top-[20%] left-[50%] translate-x-[-50%]">
        {children}
      </div>
      <EmptyListSvg className="h-full w-full max-w-[32rem]" />
    </div>
  );
}
