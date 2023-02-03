-- Verify eed:tables/dlp_analytics on pg

BEGIN;

select id, column_title, identified_info_type, max_likelihood, identified_likelihoods, quotes, findings_ids, to_anonymize
  from data_clean_room.dlp_column_analysis
  where false;

select id, completed, columns_analyzed, import_record_id
  from data_clean_room.dlp_table_analysis
  where false;

ROLLBACK;
