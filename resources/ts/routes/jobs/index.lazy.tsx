import { useState } from "react";
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
import { JobView } from "@/modules/Job/job-view";
import { cn } from "@/lib/utils";

export const Route = createLazyFileRoute("/jobs/")({
  component: Jobs,
});

function Jobs() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const jobsQuery = useQuery<HttpResponse<Job[]>>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await fetch(`/api${HOMEPAGE_ROOT_PATH}/jobs`);
      return response.json();
    },
  });

  const deleteJobFailedMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api${HOMEPAGE_ROOT_PATH}/jobs/${id}`, {
        method: "DELETE",
      });
      return response.json();
    },
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
            <h1 className="font-medium">Jobs</h1>
          </PageHeader>
          <div className="flex flex-col space-y-2 p-4">
            {jobsQuery.isLoading && <div>Loading...</div>}
            {jobsQuery.isError && <div>Error: {jobsQuery.error.message}</div>}
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
                    onDelete={() => deleteJobFailedMutation.mutate(job.id)}
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
