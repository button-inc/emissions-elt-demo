import { postgraphile } from "postgraphile";
import { pgAdmin } from "@/lib/postgraphile/pool/pgAdmin";

import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import PgOrderByRelatedPlugin from "@graphile-contrib/pg-order-by-related";

// 👇️ graphql API- works with api\graphql
export const requestHandler = postgraphile(
  pgAdmin,
  [process.env.DATABASE_SCHEMA_ADMIN, process.env.DATABASE_SCHEMA_CLEAN],
  {
    enhanceGraphiql: true,
    graphiql: true,
    graphiqlRoute: "/api/graphiql",
    graphqlRoute: "/api/graphql",
    appendPlugins: [
      PgSimplifyInflectorPlugin,
      ConnectionFilterPlugin,
      PgOrderByRelatedPlugin,
    ],
  }
);

export default requestHandler;
