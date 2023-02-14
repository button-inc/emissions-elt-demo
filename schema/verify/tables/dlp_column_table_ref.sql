-- Verify eed:tables/dlp_column_table_ref on pg

BEGIN;

select table_analysis_id, column_analysis_id
  from data_clean_room.dlp_table_column
  where false;

ROLLBACK;
