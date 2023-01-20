-- Verify eed:tables/study_area_geometry on pg

BEGIN;

select area_name, hex_geometry
  from data_science_workspace.study_area_geometry
  where false;

ROLLBACK;
