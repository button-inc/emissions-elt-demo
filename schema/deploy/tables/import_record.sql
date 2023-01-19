-- Deploy eed:tables/import_record to pg

BEGIN;

create table if not exists data_clean_room.track_format(
  id SERIAL PRIMARY KEY,
  nickname TEXT not null
);

create table if not exists data_clean_room.import_record(
  job_id SERIAL PRIMARY KEY,
  file_name TEXT not null,
  uploaded_by_user_id INTEGER REFERENCES eed.permissions(id),
  track_format_id INTEGER REFERENCES data_clean_room.track_format(id),
  submission_date TIMESTAMP not null DEFAULT NOW()
);

-- dev roles
grant all on all tables in schema data_clean_room to eed_internal, eed_external, eed_admin;
-- -- analyst
grant all on all tables in schema data_clean_room to analyst;
-- dropper
grant all on all tables in schema data_clean_room to dropper;

-- Removes vestigal tables if they exist
drop table if exists eed.import_record;
drop table if exists eed.track_format;

COMMIT;
