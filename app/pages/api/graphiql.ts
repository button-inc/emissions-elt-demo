import { postgraphile } from "postgraphile";
import { pgAdmin } from "@/lib/postgraphile/pool/pgAdmin";
import { options } from "@/lib/postgraphile/options";

// 👇️ graphql API- works with api\graphql
export const requestHandler = postgraphile(
  pgAdmin,
  [
    process.env.DATABASE_SCHEMA_ADMIN,
    process.env.DATABASE_SCHEMA_CLEAN,
    process.env.DATABASE_SCHEMA_WORKSPACE,
  ],
  {
    ...options,
    graphiqlRoute: "/api/graphiql",
    graphqlRoute: "/api/graphql",
  }
);

export default requestHandler;
