-- Revert eed:tables/dlp_analytics from pg

BEGIN;

drop table if exists data_clean_room.dlp_table_analysis;
drop table if exists data_clean_room.dlp_column_analysis;

COMMIT;
