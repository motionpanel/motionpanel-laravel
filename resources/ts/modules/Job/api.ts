import { HOMEPAGE_ROOT_PATH } from "@/config/config";
import type { HttpResponse, Job, JobStatus } from "./types";
import { fetchWithCsrf } from "@/lib/utils";

export async function getJobSystemStatus(): Promise<HttpResponse<JobStatus>> {
  const response = await fetchWithCsrf(
    `/api${HOMEPAGE_ROOT_PATH}/jobs/system-status`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.json();
}

export async function getJobs(): Promise<HttpResponse<Job[]>> {
  const response = await fetchWithCsrf(`/api${HOMEPAGE_ROOT_PATH}/jobs`, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function deleteJob(id: string) {
  const response = await fetchWithCsrf(`/api${HOMEPAGE_ROOT_PATH}/jobs/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });
  return response.json();
}
