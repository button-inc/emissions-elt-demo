-- Verify eed:computed_columns/voyage_combined_id on pg

BEGIN;

select pg_get_functiondef('data_clean_room.dlp_table_column_job_id(data_clean_room.dlp_table_column)'::regprocedure);

ROLLBACK;
