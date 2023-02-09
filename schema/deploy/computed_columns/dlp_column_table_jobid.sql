-- Deploy eed:computed_columns/voyage_combined_id to pg

BEGIN;

create or replace function data_clean_room.dlp_table_column_job_id(dtc_id data_clean_room.dlp_table_column)
returns varchar as $computed_column$
  select dta.import_record_id
    from data_clean_room.dlp_table_analysis dta
    where dtc_id.table_analysis_id = dta.id;
$computed_column$ language sql stable;

grant execute on function data_clean_room.dlp_table_column_job_id to eed_internal, eed_external, eed_admin;
grant execute on function data_clean_room.dlp_table_column_job_id to analyst, manager;

comment on function data_clean_room.dlp_table_column_job_id is 'Computed column for postgraphile to retrieve the job id related to a table analysis';

COMMIT;
