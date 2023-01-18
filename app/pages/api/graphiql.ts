import { postgraphile } from "postgraphile";
import { pgAdmin } from "@/lib/postgraphile/pool/pgAdmin";

// 👇️ graphql API- works with api\graphql
export const requestHandler = postgraphile(
  pgAdmin,
  process.env.DATABASE_SCHEMA_ADMIN,
  {
    enhanceGraphiql: true,
    graphiql: true,
    graphiqlRoute: "/api/graphiql",
    graphqlRoute: "/api/graphql",
  }
);

export default requestHandler;
