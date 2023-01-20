-- Verify eed:tables/waste_data on pg

BEGIN;

select id, district_name, district_shape
  from data_science_workspace.regional_district
  where false;

select id, municipal_legal_name, municipal_abbreviated_name, municipal_shape, regional_district
  from data_science_workspace.municipal_district
  where false;

select id, regional_district_name, reporting_year, total_disposed_tonnes, population_count, disposal_rate_kg
  from data_clean_room.raw_regional_waste_data
  where false;

select id, regional_district, year, total_disposed_tonnes, population_count
  from data_science_workspace.regional_waste_data
  where false;

ROLLBACK;
