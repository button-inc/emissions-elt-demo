-- Verify eed:tables/insight-destination-processed on pg

BEGIN;

select study_area_id, area_name, updated_at
  from eed.study_area
  where false;

select origin_area_id, destination_area_id, voyage_count, updated_at
  from eed.insights_voyage
  where false;

select origin_area_id, destination_area_id, distance, updated_at
  from eed.area_distance_map
  where false;

ROLLBACK;
