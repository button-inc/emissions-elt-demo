-- Deploy eed:tables/raw_insights to pg

BEGIN;

create table if not exists data_clean_room.insights_job(
  id TEXT PRIMARY KEY,
  job_type TEXT,
  study_zones TEXT[],
  job_status TEXT,
  request_id TEXT,
  created_date TIMESTAMP,
  updated_date TIMESTAMP not null DEFAULT NOW()
);

create table if not exists data_clean_room.raw_insights(
  id SERIAL PRIMARY KEY,
  job_id TEXT REFERENCES data_clean_room.insights_job(id),
  input_geoid TEXT,
  timeframe_bucket TIMESTAMP,
  output_geoid TEXT,
  count INTEGER,
  UNIQUE (input_geoid, output_geoid)
);

-- dev roles
grant all on data_clean_room.insights_job, data_clean_room.raw_insights to eed_internal, eed_external, eed_admin;
-- -- analyst
grant all on data_clean_room.insights_job, data_clean_room.raw_insights to analyst;

COMMIT;
