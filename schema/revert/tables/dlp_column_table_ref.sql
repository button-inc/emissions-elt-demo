-- Revert eed:tables/dlp_column_table_ref from pg

BEGIN;

drop table if exists data_clean_room.dlp_table_column;

COMMIT;
