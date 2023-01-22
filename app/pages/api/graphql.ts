import { postgraphile } from "postgraphile";
import { pgAdmin } from "@/lib/postgraphile/pool/pgAdmin";
import { options } from "@/lib/postgraphile/options";

import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import PgOrderByRelatedPlugin from "@graphile-contrib/pg-order-by-related";

// 👇️ graphql query- works with api\graphiql API
const requestHandler = postgraphile(
  pgAdmin,
  [process.env.DATABASE_SCHEMA_ADMIN, process.env.DATABASE_SCHEMA_CLEAN],
  {
    ...options,
    graphqlRoute: "/api/graphql",
    appendPlugins: [
      PgSimplifyInflectorPlugin,
      ConnectionFilterPlugin,
      PgOrderByRelatedPlugin,
    ],
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};
export default requestHandler;
