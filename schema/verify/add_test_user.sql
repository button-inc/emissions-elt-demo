-- Verify eed:add_test_user on pg

BEGIN;

-- Check that the eed_test_user user has been created
SELECT 1 FROM pg_user WHERE usename = 'eed_test_user';

ROLLBACK;
