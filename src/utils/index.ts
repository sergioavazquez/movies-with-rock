import config from "static/config/config.json";

export const isDevelopmentMode = () => {
  return process.env.NODE_ENV === "development";
};

export const getConfig = () => {
  // Sometimes there are multiple configs, for development for example.
  // This method helps returning the approriate config, in this case it's just one.
  return config;
};

export const log = (txt: string): void => {
  console.log(txt);
};
