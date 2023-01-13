-- Revert eed:users from pg

BEGIN;

DROP TABLE eed.permissions;

COMMIT;
