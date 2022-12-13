-- Revert eed:tables/subsecondary_indicator from pg

BEGIN;

drop table eed.subsecondary_indicator;

COMMIT;
