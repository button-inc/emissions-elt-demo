-- Revert eed:tables/secondary_indicator from pg

BEGIN;

drop table eed.secondary_indicator;

COMMIT;
