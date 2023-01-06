-- Revert eed:postgis_extension from pg

BEGIN;

DROP EXTENSION postgis CASCADE;

COMMIT;
