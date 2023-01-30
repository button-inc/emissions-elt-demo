-- Verify eed:tables/raw_insights on pg

BEGIN;

select id, job_type, study_zones, job_status, request_id, created_date, updated_date
  from data_clean_room.insights_job
  where false;

select id, job_id, input_geoid, timeframe_bucket, output_geoid, count
  from data_clean_room.raw_insights
  where false;

ROLLBACK;
