import { HOMEPAGE_ROOT_PATH } from "@/config/config";
import type { HttpResponse, Job, JobStatus } from "./types";

export async function getJobSystemStatus(): Promise<HttpResponse<JobStatus>> {
  const response = await fetch(`/api${HOMEPAGE_ROOT_PATH}/jobs/status`);
  return response.json();
}

export async function getJobs(): Promise<HttpResponse<Job[]>> {
  const response = await fetch(`/api${HOMEPAGE_ROOT_PATH}/jobs`);
  return response.json();
}

export async function deleteJob(id: string) {
  const response = await fetch(`/api${HOMEPAGE_ROOT_PATH}/jobs/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function getFailedJobs(): Promise<HttpResponse<Job[]>> {
  const response = await fetch(`/api${HOMEPAGE_ROOT_PATH}/jobs/failed`);
  return response.json();
}

export async function deleteFailedJob(id: string) {
  const response = await fetch(`/api${HOMEPAGE_ROOT_PATH}/jobs/failed/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function retryFailedJob(id: string) {
  const response = await fetch(
    `/api${HOMEPAGE_ROOT_PATH}/jobs/failed/${id}/retry`,
    {
      method: "POST",
    }
  );
  return response.json();
}
