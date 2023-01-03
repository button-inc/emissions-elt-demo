-- Revert eed:add_test_user from pg

BEGIN;

DROP USER eed_test_user;

COMMIT;
