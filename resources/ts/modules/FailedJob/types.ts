export interface HttpResponse<Payload> {
  data?: Payload;
}

export interface FailedJob {
  id: string;
  connection: string;
  queue: string;
  payload: string; // TODO: JSON string, could be parsed to JobPayload if necessary
  exception: string;
  failed_at: number;
}
