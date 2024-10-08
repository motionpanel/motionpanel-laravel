import { ListItem, Job } from "@/modules/Job";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { HOMEPAGE_ROOT_PATH } from "@/config/config";
import type { HttpResponse } from "@/types";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyPagePlaceholder } from "@/components/ui/empty-page-placeholder";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { JobView } from "@/modules/Job/job-view";

export const Route = createLazyFileRoute("/jobs/failed/")({
  component: Jobs,
});

function Jobs() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const jobsQuery = useQuery<HttpResponse<Job[]>>({
    queryKey: ["failed-jobs"],
    queryFn: async () => {
      const response = await fetch(`/api${HOMEPAGE_ROOT_PATH}/jobs/failed`);
      return response.json();
    },
  });

  const deleteJobFailedMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `/api${HOMEPAGE_ROOT_PATH}/jobs/failed/${id}`,
        {
          method: "DELETE",
        }
      );
      return response.json();
    },
    onSuccess: () => {
      jobsQuery.refetch();
      toast("Job deleted successfully");
    },
  });

  const retryJobMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `/api${HOMEPAGE_ROOT_PATH}/jobs/failed/${id}/retry`,
        {
          method: "POST",
        }
      );
      return response.json();
    },
    onSuccess: () => {
      jobsQuery.refetch();
      toast("Job retried successfully");
    },
  });
  return (
    <div className="w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <PageHeader>
            <h1 className="font-medium">Failed Jobs</h1>
          </PageHeader>
          <div className="flex flex-col space-y-2 p-4">
            {jobsQuery.isLoading && <div>Loading...</div>}
            {jobsQuery.isError && <div>Error: {jobsQuery.error.message}</div>}
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
                  job={job}
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
            <JobView
              job={selectedJob}
              showRetryButton
              showDeleteButton={!selectedJob.reserved_at}
              onRetry={() => retryJobMutation.mutate(selectedJob.id)}
              onDelete={() => deleteJobFailedMutation.mutate(selectedJob.id)}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
