export interface Config {
  api_root: string;
  bearer_token: string;
  paths?: {
    [path: string]: string;
  };
}
