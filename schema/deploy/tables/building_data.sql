-- Deploy eed:tables/building_data to pg

BEGIN;

create table if not exists data_clean_room.dwelling_populations(
  id SERIAL PRIMARY KEY,
  reference_date INTEGER default 2021,
  geographic_location TEXT not null,
  dwellings_occupied_by_usual_residents INTEGER,
  population_in_dwellings INTEGER
);

create table if not exists data_science_workspace.building_populations(
  id SERIAL PRIMARY KEY,
  reference_date INTEGER default 2021,
  municipal_name TEXT not null,
  dwellings_occupied_by_usual_residents INTEGER,
  population_in_dwellings INTEGER
);

create table if not exists data_clean_room.buildings(
  id SERIAL PRIMARY KEY,
  longitude decimal,
  latitude decimal,
  csduid text,
  csdname text,
  data_prov text,
  build_id text,
  shape_length decimal,
  shape_footprint_area decimal
);

create table if not exists data_science_workspace.municipal_building(
  id SERIAL primary key,
  municipal_name text not null,
  total_buildings integer,
  total_building_area decimal,
  UNIQUE (municipal_name)
);

-- dev roles
grant all on data_clean_room.dwelling_populations, data_clean_room.buildings, data_science_workspace.municipal_building to eed_internal, eed_external, eed_admin;
-- -- analyst
grant all on data_clean_room.dwelling_populations, data_clean_room.buildings, data_science_workspace.municipal_building to analyst;
-- manager
grant all on data_clean_room.dwelling_populations, data_science_workspace.municipal_building to manager;

COMMIT;
