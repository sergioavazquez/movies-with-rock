import { MovieFetchRequest, ApiResponse } from "models/api";

const bearer_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjU3OWI5YjQ1ODczZTFlMDUyMzVjN2I5YmMxMDI2NiIsInN1YiI6IjVmOTcxODc4NjRkZTM1MDAzOGYxY2FjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VWvLdS8hwH5Rw-dznQuV0OgnBdhflVXdGumNT_CbK6I";
const api_root = "https://api.themoviedb.org/3/";

const catchError = (response: Response) => {
  return response.json().catch(() => {
    return {};
  });
};

const parseJSON = (response: Response): Promise<ApiResponse> => {
  return new Promise((resolve) =>
    catchError(response).then((json: any) =>
      resolve({
        status: response.status,
        ok: response.ok,
        data: json,
      })
    )
  );
};

export const apiCall = async (
  requestUrl: string,
  token: string
): Promise<ApiResponse> => {
  const headers = new Headers();
  headers.append("content-type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

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

export const fetchTmdbMovies = async (
  movieFetchRequest: MovieFetchRequest
): Promise<ApiResponse> => {
  const endpoint = movieFetchRequest.endpoint.toLowerCase();
  let requestUrl = `${api_root}${endpoint}/movie?`;
  if (movieFetchRequest.sortBy) {
    requestUrl = `${requestUrl}&sort_by=${movieFetchRequest.sortBy}`;
  }
  if (movieFetchRequest.query) {
    requestUrl = `${requestUrl}&query=${movieFetchRequest.query}`;
  }
  const apiResponse = await apiCall(requestUrl, bearer_token);
  return apiResponse;
};

export const fetchTmdbConfig = async (): Promise<ApiResponse> => {
  const requestUrl = `${api_root}/configuration`;
  const apiResponse = await apiCall(requestUrl, bearer_token);
  return apiResponse;
};
