-- Revert eed:tables/study_area_geometry from pg

BEGIN;

drop table if exists data_science_workspace.study_area_geometry;

COMMIT;
