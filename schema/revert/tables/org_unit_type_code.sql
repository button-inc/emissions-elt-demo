-- Revert eed:tables/org_unit_type_code from pg

BEGIN;

drop table eed.org_unit_type_code;

COMMIT;
