-- Revert eed:tables/raw_insights from pg

BEGIN;

drop table if exists data_clean_room.raw_insights;
drop table if exists data_clean_room.insights_job;

COMMIT;
