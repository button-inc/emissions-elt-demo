import { postgraphile } from "postgraphile";
import { pgAdmin } from "@/lib/postgraphile/pool/pgAdmin";
import { options } from "@/lib/postgraphile/options";

const requestHandler = postgraphile(
  pgAdmin,
  process.env.DATABASE_SCHEMA_ADMIN,
  {
    ...options,
    graphqlRoute: "/api/auth/role",
  }
);

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default requestHandler;
