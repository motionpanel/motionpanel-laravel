import { useState } from "react";
import { ListItem, Job } from "@/modules/Job";
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
import { JobView } from "@/modules/Job/job-view";
import { cn } from "@/lib/utils";
import { StatusView } from "@/modules/Job/status-view";
import { deleteJob, getJobs } from "@/modules/Job/api";
import { ErrorPagePlaceholder } from "@/components/ui/error-page-placeholder";
import { CircleSpinning } from "@/components/ui/circle-spinning";

export const Route = createLazyFileRoute("/jobs/")({
  component: Jobs,
});

function Jobs() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  const deleteJobMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      jobsQuery.refetch();
      toast("Job deleted successfully");
    },
  });

  return (
    <div className="w-full h-full flex flex-col">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <PageHeader>
            <h1 className="font-medium flex-1">Jobs</h1>
            <StatusView />
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
                    No jobs available
                  </div>
                </EmptyPagePlaceholder>
              </div>
            )}

            {jobsQuery.isSuccess &&
              jobsQuery.data?.data?.map((job) => (
                <div className="rounded-sm" key={job.id}>
                  <ListItem
                    className={cn(
                      selectedJob?.id === job.id ? "bg-zinc-100" : undefined,
                      "border",
                      "border-zinc-200"
                    )}
                    job={job}
                    showAttempts
                    showCreatedAt
                    showDeleteButton={!job.reserved_at}
                    onDelete={() => deleteJobMutation.mutate(job.id)}
                    description={
                      job.reserved_at
                        ? "Possibly in progress or will be retried"
                        : undefined
                    }
                    onItemClick={() => setSelectedJob(job)}
                  />
                </div>
              ))}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          {selectedJob && (
            <JobView
              job={selectedJob}
              showCreatedAt
              showAttempts
              showDeleteButton={!selectedJob.reserved_at}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
