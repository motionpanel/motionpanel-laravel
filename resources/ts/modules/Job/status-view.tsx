import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DotIcon, LoaderCircleIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getJobSystemStatus } from "./api";
import type { JobStatus } from "./types";

function isJobStatusValid(status: JobStatus) {
  if (status.queue_connection === "database") {
    return status.failed_jobs_table_exists && status.jobs_table_exists;
  } else if (status.queue_connection === "redis") {
    return true;
  } else {
    return false;
  }
}

export function StatusView() {
  const jobsSystemStatusQuery = useQuery({
    queryKey: ["jobs", "system-status"],
    queryFn: getJobSystemStatus,
  });
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="icon" variant={"ghost"}>
          {jobsSystemStatusQuery.isLoading && (
            <div>
              <LoaderCircleIcon className="animate-spin w-4 h-4" />
            </div>
          )}
          {jobsSystemStatusQuery.isError && (
            <div className="flex relative">
              <DotIcon
                strokeWidth={16}
                className="absolute animate-ping text-red-500 w-4 h-4"
              />
              <DotIcon strokeWidth={8} className="text-red-500 w-4 h-4" />
            </div>
          )}
          {jobsSystemStatusQuery.isSuccess &&
          isJobStatusValid(jobsSystemStatusQuery.data.data as JobStatus) ? (
            <DotIcon strokeWidth={8} className="text-green-500 w-4 h-4" />
          ) : (
            <DotIcon strokeWidth={8} className="text-red-500 w-4 h-4" />
            // <div>
            //   <span className="text-sm font-medium">System Status: </span>
            //   <span className="text-sm font-medium">
            //     {JSON.stringify(jobsSystemStatusQuery.data?.data)}
            //   </span>
            // </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Job system status</DialogTitle>
          <DialogDescription>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Queue driver</TableCell>
                  <TableCell>
                    {jobsSystemStatusQuery.isSuccess &&
                      (jobsSystemStatusQuery.data?.data?.queue_connection ===
                        "database" || "redis" ? (
                        <span className="inline-flex items-center">
                          <DotIcon className="text-green-500" />
                          <code className="bg-slate-600 rounded p-1 text-white text-xs">
                            {jobsSystemStatusQuery.data?.data?.queue_connection}
                          </code>
                        </span>
                      ) : (
                        <span className="inline-flex items-center">
                          <DotIcon className="text-red-500" />
                          <code className="bg-slate-600 rounded p-1 text-white text-xs">
                            {jobsSystemStatusQuery.data?.data?.queue_connection}
                          </code>
                          (should "database" or "redis")
                        </span>
                      ))}
                  </TableCell>
                </TableRow>
                {jobsSystemStatusQuery.isSuccess &&
                  jobsSystemStatusQuery.data?.data?.queue_connection ===
                    "database" && (
                    <TableRow>
                      <TableCell>
                        <code className="bg-slate-600 rounded p-1 text-white text-xs">
                          jobs
                        </code>{" "}
                        database table exists
                      </TableCell>
                      <TableCell>
                        {jobsSystemStatusQuery.data.data.jobs_table_exists ? (
                          <span className="inline-flex items-center">
                            <DotIcon className="text-green-500" /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center">
                            <DotIcon className="text-red-500" /> No
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                {jobsSystemStatusQuery.isSuccess &&
                  jobsSystemStatusQuery.data?.data?.queue_connection ===
                    "database" && (
                    <TableRow>
                      <TableCell>
                        <code className="bg-slate-600 rounded p-1 text-white text-xs">
                          failed_jobs
                        </code>{" "}
                        database table exists
                      </TableCell>
                      <TableCell>
                        {jobsSystemStatusQuery.data?.data
                          ?.failed_jobs_table_exists ? (
                          <span className="inline-flex items-center">
                            <DotIcon className="text-green-500" /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center">
                            <DotIcon className="text-red-500" /> No
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
