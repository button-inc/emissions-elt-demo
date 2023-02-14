-- Deploy eed:tables/dlp_column_table_ref to pg

BEGIN;

create table if not exists data_clean_room.dlp_table_column (
  table_analysis_id int not null references data_clean_room.dlp_table_analysis (id)
    on update cascade on delete cascade,
  column_analysis_id int not null references data_clean_room.dlp_column_analysis (id)
    on update cascade,
  PRIMARY KEY (table_analysis_id, column_analysis_id)
);

-- dev roles
grant all on data_clean_room.dlp_table_column to eed_internal, eed_external, eed_admin;
-- -- analyst
grant all on data_clean_room.dlp_table_column to analyst;

COMMIT;
