import { Button } from "@/components/ui/button";
import type { FailedJob } from "./types";
import { Badge } from "@/components/ui/badge";
import { cn, getRelativeDate } from "@/lib/utils";
import { RotateCcwIcon, Trash2Icon } from "lucide-react";

interface Props {
  failedJob: FailedJob;
  onDelete?: (failedJob: FailedJob) => void;
  onRetry?: (failedJob: FailedJob) => void;
  showFailedAt?: boolean;
  showRetryButton?: boolean;
  showDeleteButton?: boolean;
  description?: string;
  className?: string;
  onItemClick?: (job: FailedJob) => void;
}

export function ListItem(props: Props) {
  const {
    failedJob,
    onDelete,
    onRetry,
    showFailedAt,
    showRetryButton,
    showDeleteButton,
    description,
    className,
    onItemClick,
  } = props;
  return (
    <div
      className={cn(
        "rounded",
        "dark:border",
        "dark:border-slate-800",
        "hover:bg-zinc-100",
        "transition-colors",
        "p-4",
        "cursor-pointer",
        className
      )}
      onClick={() => onItemClick && onItemClick(failedJob)}
    >
      <div className="flex">
        <div className="flex-col flex-1">
          <Badge className="font-semibold mb-2">{failedJob.queue}</Badge>
          <div className="flex">
            <div className="font-semibold">ID: {failedJob.id}</div>
          </div>
          <div className="flex-col">
            {showFailedAt && (
              <div className="text-gray-500">
                Failed {getRelativeDate(failedJob.failed_at)}
              </div>
            )}
            {description && (
              <em className="dark:text-slate-500">{description}</em>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          {showRetryButton && (
            <Button
              size="icon"
              variant="ghost"
              className="text-indigo-800"
              onClick={(e) => {
                e.stopPropagation();
                onRetry && onRetry(failedJob);
              }}
            >
              <RotateCcwIcon className="w-4 h-4" />
            </Button>
          )}
          {showDeleteButton && (
            <Button
              size="icon"
              variant="ghost"
              className="text-red-800"
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(failedJob);
              }}
            >
              <Trash2Icon className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
