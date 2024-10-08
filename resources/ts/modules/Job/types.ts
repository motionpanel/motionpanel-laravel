export interface HttpResponse<Payload> {
  data?: Payload;
}

export interface Job {
  id: string;
  queue: string;
  payload: string; // TODO: JSON string, could be parsed to JobPayload if necessary
  attempts: number;
  reserved_at: number;
  available_at: number;
  created_at: number;
}

export interface JobStatus {
  jobs_table_exists?: boolean;
  failed_jobs_table_exists?: boolean;
  queue_connection: string;
}
