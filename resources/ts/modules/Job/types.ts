export interface Job {
  id: string;
  queue: string;
  payload: string; // TODO: JSON string, could be parsed to JobPayload if necessary
  attempts?: number;
  reserved_at?: number;
  available_at?: number;
  created_at?: number;
  failed_at?: number;
}
