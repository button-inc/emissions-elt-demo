-- Verify eed:change_password on pg

BEGIN;

SELECT has_function_privilege('eed_private.change_password(varchar(1000), varchar(1000), varchar(1000))', 'execute');

ROLLBACK;
