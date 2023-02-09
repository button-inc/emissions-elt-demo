-- Revert eed:computed_columns/voyage_combined_id from pg

BEGIN;

drop function if exists data_clean_room.dlp_table_column_job_id;

COMMIT;
