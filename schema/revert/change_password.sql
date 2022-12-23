-- Revert eed:change_password from pg

BEGIN;

DROP FUNCTION eed_private.change_password(varchar(1000), varchar(1000), varchar(1000));

COMMIT;
