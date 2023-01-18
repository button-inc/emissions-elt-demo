import { postgraphile } from "postgraphile";
import { pgDropper } from "@/lib/postgraphile/pool/pgDropper";
import { options } from "@/lib/postgraphile/options";

const requestHandler = postgraphile(
  pgDropper,
  process.env.DATABASE_SCHEMA_VAULT,
  {
    ...options,
    graphqlRoute: "/api/dropper/graphql/vault",
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};
export default requestHandler;
