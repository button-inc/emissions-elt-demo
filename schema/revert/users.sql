-- Revert eed:users from pg

BEGIN;

DROP TABLE eed.users;

COMMIT;
