import { postgraphile } from "postgraphile";
import { pgAnalyst } from "@/lib/postgraphile/pool/pgAnalyst";
import { options } from "@/lib/postgraphile/options";

const requestHandler = postgraphile(
  pgAnalyst,
  [
    process.env.DATABASE_SCHEMA_ADMIN,
    process.env.DATABASE_SCHEMA_CLEAN,
    process.env.DATABASE_SCHEMA_WORKSPACE,
  ],
  {
    ...options,
    graphqlRoute: "/api/analyst/graphql",
  }
);

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default requestHandler;
