-- Deploy eed:tables/import_record to pg

BEGIN;

create table eed.track_format(
  id SERIAL PRIMARY KEY,
  nickname TEXT not null
);

create table eed.import_record(
  job_id SERIAL PRIMARY KEY,
  file_name TEXT not null,
  uploaded_by_user_id INTEGER REFERENCES eed.permissions(id),
  track_format_id INTEGER REFERENCES eed.track_format(id),
  submission_date TIMESTAMP not null DEFAULT NOW()
);

drop table if exists data_clean_room.import_record;
drop table if exists data_clean_room.track_format;


COMMIT;
