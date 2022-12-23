-- Verify eed:add_test_user on pg

BEGIN;

-- Check that the eed_test_user user has been created
SELECT 1 FROM pg_user WHERE usename = 'eed_test_user';

-- Check that the eed_private.insert_user function was called for the eed_test_user user
SELECT 1 FROM eed.users WHERE username = 'eed_test_user';

ROLLBACK;
