import { Button } from "@/components/ui/button";
import type { Job } from "./types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
  } = props;
  return (
    <div
      className={cn(
        "rounded",
        "dark:border",
        "dark:border-slate-800",
        "p-2",
        "hover:bg-zinc-100",
        "transition-colors",
        className
      )}
    >
      <div className="flex justify-between">
        <div className="flex-col space-y-2">
          <div className="flex space-x-2">
            <Badge className="font-semibold">{job.queue}</Badge>
            <Badge>ID: {job.id}</Badge>
          </div>
          <div className="flex-col space-y-2 text-sm">
            {showCreatedAt && <>Created at {job.created_at}</>}
            {showAttempts && <div>{job.attempts} attempts</div>}
            <div>{showFailedAt && <span>failed at {job.failed_at}</span>}</div>
            <em className="dark:text-slate-500">{description}</em>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          {showRetryButton && (
            <Button
              size="sm"
              variant={"outline"}
              onClick={() => onRetry && onRetry(job)}
            >
              Retry
            </Button>
          )}
          {showDeleteButton && (
            <Button
              size="sm"
              variant={"destructive"}
              onClick={() => onDelete && onDelete(job)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
