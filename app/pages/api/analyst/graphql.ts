import { postgraphile } from "postgraphile";
import { pgAnalyst } from "@/lib/postgraphile/pool/pgAnalyst";
import { options } from "@/lib/postgraphile/options";

const requestHandler = postgraphile(
  pgAnalyst,
  process.env.DATABASE_SCHEMA_ADMIN,
  {
    ...options,
    graphqlRoute: "/api/analyst/graphql",
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};
export default requestHandler;
