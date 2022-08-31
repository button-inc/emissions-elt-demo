-- Revert eed:tables/postal_code from pg

BEGIN;

drop table eed.postal_code;

COMMIT;
