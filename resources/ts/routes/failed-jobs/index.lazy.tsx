import { ListItem, FailedJob } from "@/modules/FailedJob";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyPagePlaceholder } from "@/components/ui/empty-page-placeholder";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FailedJobView } from "@/modules/FailedJob/failed-job-view";
import {
  deleteFailedJob,
  getFailedJobs,
  retryFailedJob,
} from "@/modules/FailedJob/api";
import { ErrorPagePlaceholder } from "@/components/ui/error-page-placeholder";
import { CircleSpinning } from "@/components/ui/circle-spinning";

export const Route = createLazyFileRoute("/failed-jobs/")({
  component: Jobs,
});

function Jobs() {
  const [selectedJob, setSelectedJob] = useState<FailedJob | null>(null);
  const jobsQuery = useQuery({
    queryKey: ["failed-jobs"],
    queryFn: getFailedJobs,
  });

  const deleteJobFailedMutation = useMutation({
    mutationFn: deleteFailedJob,
    onSuccess: () => {
      jobsQuery.refetch();
      toast("Job deleted successfully");
    },
  });

  const retryJobMutation = useMutation({
    mutationFn: retryFailedJob,
    onSuccess: () => {
      jobsQuery.refetch();
      toast("Job retried successfully");
    },
  });
  return (
    <div className="w-full h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <PageHeader>
            <h1 className="font-medium flex-1">Failed Jobs</h1>
          </PageHeader>
          <div className="flex flex-col space-y-2 p-4">
            {jobsQuery.isLoading && <CircleSpinning className="w-full" />}
            {jobsQuery.isError && (
              <ErrorPagePlaceholder>
                {jobsQuery.error.message}
              </ErrorPagePlaceholder>
            )}
            {jobsQuery.isSuccess && jobsQuery.data?.data?.length === 0 && (
              <div className="flex items-center justify-center">
                <EmptyPagePlaceholder>
                  <div className="text-lg font-extralight">
                    Congratulations, no failed jobs!
                  </div>
                </EmptyPagePlaceholder>
              </div>
            )}
            {jobsQuery.isSuccess &&
              jobsQuery.data?.data?.map((job) => (
                <ListItem
                  key={job.id}
                  failedJob={job}
                  className={cn(
                    selectedJob?.id === job.id ? "bg-zinc-100" : undefined,
                    "border",
                    "border-zinc-200",
                    "rounded-sm"
                  )}
                  onDelete={() => deleteJobFailedMutation.mutate(job.id)}
                  onRetry={() => retryJobMutation.mutate(job.id)}
                  showRetryButton
                  showDeleteButton
                  showFailedAt
                  onItemClick={() => setSelectedJob(job)}
                />
              ))}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          {selectedJob && (
            <FailedJobView
              failedJob={selectedJob}
              showRetryButton
              showFailedAt
              showDeleteButton
              onRetry={() => retryJobMutation.mutate(selectedJob.id)}
              onDelete={() => deleteJobFailedMutation.mutate(selectedJob.id)}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
