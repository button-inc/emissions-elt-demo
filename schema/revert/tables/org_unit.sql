-- Revert eed:tables/org_unit from pg

BEGIN;

drop table eed.org_unit;

COMMIT;
