export enum MovieApiEndpoints {
  DISCOVER = "DISCOVER",
  SEARCH = "SEARCH",
}

export interface MovieFetchRequest {
  endpoint: MovieApiEndpoints;
  query?: string;
  sortBy?: string;
}

export interface ApiResponse {
  status: number;
  ok: boolean;
  data: any;
}
