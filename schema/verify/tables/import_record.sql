-- Verify eed:tables/import_record on pg

BEGIN;

select id, nickname
  from eed.track_format
  where false;

select job_id, file_name, submission_date
  from eed.import_record
  where false;


ROLLBACK;
