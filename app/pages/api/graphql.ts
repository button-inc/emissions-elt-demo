import { postgraphile } from 'postgraphile';
import { pgAdmin } from '@/lib/postgraphile/pool/pgAdmin';
import { options } from '@/lib/postgraphile/options';

// 👇️ graphql query- works with api\graphiql API
const requestHandler = postgraphile(
  pgAdmin,
  process.env.DATABASE_SCHEMA_ADMIN,
  {
    ...options,
    graphqlRoute: '/api/graphql',
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};
export default requestHandler;
