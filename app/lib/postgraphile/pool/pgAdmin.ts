import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_PROTOCOL +
    '://' +
    process.env.DATABASE_USER_ADMIN +
    ':' +
    process.env.DATABASE_USER_PW_ADMIN +
    '@' +
    process.env.DATABASE_HOST +
    ':' +
    process.env.DATABASE_PORT +
    '/' +
    process.env.DATABASE,
});

export { pool as pgAdmin };
