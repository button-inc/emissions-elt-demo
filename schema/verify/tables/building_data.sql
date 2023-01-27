-- Verify eed:tables/building_data on pg

BEGIN;

select id, reference_date, geographic_location, dwellings_occupied_by_usual_residents, population_in_dwellings
  from data_clean_room.dwelling_populations
  where false;

select id, reference_date, municipal_name, dwellings_occupied_by_usual_residents, population_in_dwellings
  from data_science_workspace.building_populations
  where false;

select id, longitude, latitude, csduid, csdname, data_prov, build_id, shape_length, shape_footprint_area
  from data_clean_room.buildings
  where false;

select id, municipal_name, total_buildings, total_building_area
  from data_science_workspace.municipal_building
  where false;

ROLLBACK;
