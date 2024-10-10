import moment from "moment";
import { CopyIcon, RotateCcwIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FailedJob } from "./types";

interface Props {
  failedJob: FailedJob;
  showDeleteButton?: boolean;
  showRetryButton?: boolean;
  onDelete?: (job: FailedJob) => void;
  onRetry?: (job: FailedJob) => void;
  showFailedAt?: boolean;
}

export function FailedJobView(props: Props) {
  const {
    failedJob,
    showDeleteButton,
    onDelete,
    showRetryButton,
    onRetry,
    showFailedAt,
  } = props;
  const copyJobPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(failedJob, null, 2));
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
                onRetry && onRetry(failedJob);
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
                onDelete && onDelete(failedJob);
              }}
            >
              <Trash2Icon className="w-4 h-4" />
            </Button>
          )}
        </div>
      </PageHeader>
      <div>
        <div className="p-4">
          <div>ID: {failedJob.id}</div>
          <div>
            <div>
              On <span className="font-semibold">{failedJob.queue}</span> queue
            </div>

            {showFailedAt && (
              <div>
                At {failedJob.failed_at} (
                {moment(failedJob.failed_at).fromNow()})
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className="p-4">
          <div className="p-4">
            <Tabs defaultValue="payload">
              <TabsList>
                <TabsTrigger value="payload">Payload</TabsTrigger>
                <TabsTrigger value="exception">Exception</TabsTrigger>
              </TabsList>
              <TabsContent value="payload">
                <div className="relative">
                  <div className="absolute right-0 top-0 p-2 z-30">
                    <Button
                      size="icon"
                      variant={"outline"}
                      onClick={copyJobPayload}
                    >
                      <CopyIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1 relative w-full max-h-[500px] overflow-auto border">
                    <pre className=" left-0 right-0 top-0 bottom-0 p-4 text-wrap">
                      {JSON.stringify(JSON.parse(failedJob.payload), null, 2)}
                    </pre>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="exception">
                <div className="relative">
                  <div className="absolute right-0 top-0 p-2 z-30">
                    <Button
                      size="icon"
                      variant={"outline"}
                      onClick={copyJobPayload}
                    >
                      <CopyIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1 relative w-full max-h-[500px] overflow-auto border">
                    <pre className="left-0 right-0 top-0 bottom-0 p-4 text-wrap">
                      {failedJob.exception}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
