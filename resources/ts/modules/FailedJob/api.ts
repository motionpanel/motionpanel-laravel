import { HOMEPAGE_ROOT_PATH } from "@/config/config";
import type { HttpResponse, FailedJob } from "./types";

export async function getFailedJobs(): Promise<HttpResponse<FailedJob[]>> {
  const response = await fetch(`/api${HOMEPAGE_ROOT_PATH}/failed-jobs`);
  return response.json();
}

export async function deleteFailedJob(id: string) {
  const response = await fetch(`/api${HOMEPAGE_ROOT_PATH}/failed-jobs/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function retryFailedJob(id: string) {
  const response = await fetch(
    `/api${HOMEPAGE_ROOT_PATH}/failed-jobs/${id}/retry`,
    {
      method: "POST",
    }
  );
  return response.json();
}
