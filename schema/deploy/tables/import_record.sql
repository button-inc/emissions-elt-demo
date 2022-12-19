-- Deploy eed:tables/import_record to pg

BEGIN;

create table eed.track_format(
  id SERIAL PRIMARY KEY,
  nickname TEXT not null
);

create table eed.import_record(
  job_id SERIAL PRIMARY KEY,
  file_name TEXT not null,
  track_format_id INTEGER REFERENCES eed.track_format(id),
  submission_date TIMESTAMP not null DEFAULT NOW()
);

COMMIT;
