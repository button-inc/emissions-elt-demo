-- Revert eed:tables/sector_type_code from pg

BEGIN;

drop table eed.sector_type_code;

COMMIT;
