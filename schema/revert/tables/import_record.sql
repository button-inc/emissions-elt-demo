-- Revert eed:tables/import_record from pg

BEGIN;

drop table eed.import_record;
drop table eed.track_format;

COMMIT;
