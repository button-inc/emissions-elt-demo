-- Deploy eed:tables/dlp_analytics to pg

BEGIN;

create table if not exists data_clean_room.dlp_column_analysis(
  id SERIAL PRIMARY KEY,
  column_title TEXT not null,
  identified_info_type TEXT,
  max_likelihood INTEGER default 0,
  identified_likelihoods TEXT[],
  quotes TEXT[],
  findings_ids TEXT[],
  to_anonymize BOOLEAN
);

create table if not exists data_clean_room.dlp_table_analysis(
  id SERIAL PRIMARY KEY,
  completed BOOLEAN,
  columns_analyzed INTEGER[],
  import_record_id INTEGER references data_clean_room.import_record(job_id)
);

-- dev roles
grant all on data_clean_room.dlp_column_analysis, data_clean_room.dlp_table_analysis to eed_internal, eed_external, eed_admin;
-- -- analyst
grant all on data_clean_room.dlp_column_analysis, data_clean_room.dlp_table_analysis to analyst;

COMMIT;
