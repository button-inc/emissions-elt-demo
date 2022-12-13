-- Revert eed:tables/livestock_type_code from pg

BEGIN;

drop table eed.livestock_type_code;

COMMIT;
