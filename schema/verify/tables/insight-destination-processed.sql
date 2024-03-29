-- Verify eed:tables/insight-destination-processed on pg

BEGIN;

select study_area_id, area_name, updated_at
  from data_science_workspace.study_area
  where false;

select origin_area_id, destination_area_id, voyage_count, start_time, updated_at
  from data_science_workspace.insights_voyage
  where false;

ROLLBACK;
