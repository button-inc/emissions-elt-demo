-- Revert eed:tables/subsector_type_code from pg

BEGIN;

drop table eed.subsector_type_code;

COMMIT;
