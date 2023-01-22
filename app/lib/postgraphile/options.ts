import { Options } from "postgraphile";
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import PgOrderByRelatedPlugin from "@graphile-contrib/pg-order-by-related";

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
  appendPlugins: [
    PgSimplifyInflectorPlugin,
    ConnectionFilterPlugin,
    PgOrderByRelatedPlugin,
  ],
};
