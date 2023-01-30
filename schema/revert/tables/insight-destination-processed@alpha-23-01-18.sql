-- Revert eed:tables/insight-destination-processed from pg

BEGIN;

drop table if exists eed.area_distance_map;
drop table if exists eed.insights_voyage;
drop table if exists eed.study_area;

COMMIT;
