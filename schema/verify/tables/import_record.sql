-- Verify eed:tables/import_record on pg

BEGIN;

select id, nickname
  from data_clean_room.track_format
  where false;

select job_id, file_name, uploaded_by_user_id, track_format_id, submission_date
  from data_clean_room.import_record
  where false;


ROLLBACK;
