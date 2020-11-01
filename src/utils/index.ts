import { config } from "static/config/config";
import { config as devConfig } from "static/config/config.dev";
import { Config } from "models/system";

export const isDevelopmentMode = () => {
  return process.env.NODE_ENV === "development";
};

/**
 * Sometimes there are multiple configs. In this case it's the same.
 * This method helps returning the approriate config, in this case it's just one.
 */
export const getConfig = (): Config => {
  return isDevelopmentMode() ? devConfig : config;
};

/**
 * This helps centralize logs while while keeping them dev only.
 * @param txt
 */
export const log = (txt: string): void => {
  if (isDevelopmentMode()) {
    console.log(txt);
  }
};
