-- Revert eed:insert_user from pg

BEGIN;

DROP FUNCTION eed_private.insert_user(varchar(1000), varchar(1000), varchar(1000));

COMMIT;
