import { MovieList } from "models/moviedb";

const api_key = "af579b9b45873e1e05235c7b9bc10266";
const api_root = "https://api.themoviedb.org/3/";

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
  data: MovieList;
}

const catchError = (response: Response) => {
  return response.json().catch(() => {
    return {};
  });
};

const parseJSON = (response: Response): Promise<ApiResponse> => {
  return new Promise((resolve) =>
    catchError(response).then((json: MovieList) =>
      resolve({
        status: response.status,
        ok: response.ok,
        data: json,
      })
    )
  );
};

export const apiCall = async (
  movieFetchRequest: MovieFetchRequest
): Promise<ApiResponse> => {
  const endpoint = movieFetchRequest.endpoint.toLowerCase();
  let requestUrl = `${api_root}${endpoint}/movie?api_key=${api_key}`;
  if (movieFetchRequest.sortBy) {
    requestUrl = `${requestUrl}&sort_by=${movieFetchRequest.sortBy}`;
  }
  const headers = new Headers();
  headers.append("content-type", "application/json");
  headers.append("Accept", "application/json");

  const config: RequestInit = {
    method: "GET",
    headers: headers,
    mode: "cors",
  };

  const api_request = new Request(requestUrl, config);

  const response = await fetch(api_request);
  const apiResponse = await parseJSON(response);
  return apiResponse;
};
