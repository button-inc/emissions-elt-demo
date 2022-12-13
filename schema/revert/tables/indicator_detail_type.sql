-- Revert eed:tables/indicator_detail_type from pg

BEGIN;

drop table eed.indicator_detail_type;

COMMIT;
