import { Options } from "postgraphile";

export const options: Options = {
  dynamicJson: true,
  cors: false,
  absoluteRoutes: false,
  disableQueryLog: false,
  enableCors: false,
  ignoreRBAC: false,
  showErrorStack: false,
  watchPg: false,
  graphiql: true,
  enhanceGraphiql: true,
};
