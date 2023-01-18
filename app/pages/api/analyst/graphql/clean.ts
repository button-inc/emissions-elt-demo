import { postgraphile } from "postgraphile";
import { pgAnalyst } from "@/lib/postgraphile/pool/pgAnalyst";
import { options } from "@/lib/postgraphile/options";

const requestHandler = postgraphile(
  pgAnalyst,
  process.env.DATABASE_SCHEMA_CLEAN,
  {
    ...options,
    graphqlRoute: "/api/analyst/graphql/clean",
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};
export default requestHandler;
