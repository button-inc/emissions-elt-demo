-- Revert eed:tables/insight-destination-processed from pg

BEGIN;

drop table eed.area_distance_map;
drop table eed.insights_voyage;
drop table eed.study_area;

COMMIT;
