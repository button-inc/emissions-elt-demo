-- Verify eed:insert_user on pg

BEGIN;

SELECT has_function_privilege('eed_private.insert_user(varchar(1000), varchar(1000), varchar(1000))', 'execute');

SELECT extname FROM pg_extension WHERE extname = 'uuid-ossp';

ROLLBACK;
