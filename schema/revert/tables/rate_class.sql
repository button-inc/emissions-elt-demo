-- Revert eed:tables/rate_class from pg

BEGIN;

drop table eed.rate_class;

COMMIT;
