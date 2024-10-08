import { Button } from "@/components/ui/button";
import type { Job } from "./types";
import { Badge } from "@/components/ui/badge";
import { cn, getRelativeDate } from "@/lib/utils";
import { RotateCcwIcon, Trash2Icon } from "lucide-react";
interface Props {
  job: Job;
  onDelete?: (job: Job) => void;
  onRetry?: (job: Job) => void;
  showCreatedAt?: boolean;
  showAttempts?: boolean;
  showFailedAt?: boolean;
  showRetryButton?: boolean;
  showDeleteButton?: boolean;
  description?: string;
  className?: string;
  onItemClick?: (job: Job) => void;
}
export function ListItem(props: Props) {
  const {
    job,
    onDelete,
    onRetry,
    showCreatedAt,
    showAttempts,
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
      onClick={() => onItemClick && onItemClick(job)}
    >
      <div className="flex">
        <div className="flex-col flex-1">
          <Badge className="font-semibold mb-2">{job.queue}</Badge>
          <div className="flex">
            <div className="font-semibold">ID: {job.id}</div>
            {showCreatedAt && (
              <div className="pl-2">
                - Created {getRelativeDate(job.created_at)}
              </div>
            )}
          </div>
          <div className="flex-col">
            {showAttempts && <div>{job.attempts} attempts</div>}
            {showFailedAt && (
              <div className="text-gray-500">
                Failed {getRelativeDate(job.failed_at)}
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
                onRetry && onRetry(job);
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
                onDelete && onDelete(job);
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
