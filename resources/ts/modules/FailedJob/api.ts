import { HOMEPAGE_ROOT_PATH } from "@/config/config";
import type { HttpResponse, FailedJob } from "./types";
import { fetchWithCsrf } from "@/lib/utils";

export async function getFailedJobs(): Promise<HttpResponse<FailedJob[]>> {
  const response = await fetchWithCsrf(
    `/api${HOMEPAGE_ROOT_PATH}/failed-jobs`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.json();
}

export async function deleteFailedJob(id: string) {
  const response = await fetchWithCsrf(
    `/api${HOMEPAGE_ROOT_PATH}/failed-jobs/${id}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.json();
}

export async function retryFailedJob(id: string) {
  const response = await fetchWithCsrf(
    `/api${HOMEPAGE_ROOT_PATH}/failed-jobs/${id}/retry`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.json();
}
