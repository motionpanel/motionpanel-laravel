import { PageHeader } from "@/components/ui/page-header";
import type { Job } from "./types";
import { Button } from "@/components/ui/button";
import { CopyIcon, RotateCcwIcon, Trash2Icon } from "lucide-react";
import moment from "moment";

interface Props {
  job: Job;
  showDeleteButton?: boolean;
  showRetryButton?: boolean;
  onDelete?: (job: Job) => void;
  onRetry?: (job: Job) => void;
  showCreatedAt?: boolean;
  showAttempts?: boolean;
}

export function JobView(props: Props) {
  const {
    job,
    showDeleteButton,
    onDelete,
    showRetryButton,
    onRetry,
    showCreatedAt,
    showAttempts,
  } = props;
  const copyJobPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(job, null, 2));
  };
  return (
    <>
      <PageHeader>
        <div className="flex w-full items-center">
          <div className="flex-1"></div>
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
              variant={"ghost"}
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
      </PageHeader>
      <div>
        <div className="p-4">
          <div>ID: {job.id}</div>
          <div>
            <div>
              On <span className="font-semibold">{job.queue}</span> queue
            </div>
            {showCreatedAt && (
              <div>
                At {job.created_at} ({moment(job.created_at).fromNow()})
              </div>
            )}

            {showAttempts && <div>{job.attempts} attempts</div>}
          </div>
        </div>
        <hr />
        <div className="p-4">
          <div className="">Payload:</div>
          <div className="relative">
            <div className="absolute right-0 top-0 p-2 z-30">
              <Button size="icon" variant={"outline"} onClick={copyJobPayload}>
                <CopyIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 relative w-full h-[500px] overflow-auto border">
              <pre className="absolute left-0 right-0 top-0 bottom-0 p-4">
                {JSON.stringify(job, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
