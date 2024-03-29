import { postgraphile } from "postgraphile";
import { pgManager } from "@/lib/postgraphile/pool/pgManager";
import { options } from "@/lib/postgraphile/options";

const requestHandler = postgraphile(
  pgManager,
  process.env.DATABASE_SCHEMA_MANAGER,
  {
    ...options,
    graphqlRoute: "/api/manager/graphql",
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};
export default requestHandler;
