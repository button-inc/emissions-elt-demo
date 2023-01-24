-- Deploy eed:tables/building_data to pg

BEGIN;

create table if not exists data_clean_room.dwelling_populations(
  id SERIAL PRIMARY KEY,
  reference_date INTEGER not null,
  geographic_location TEXT not null,
  dwellings_occupied_by_usual_residents INTEGER,
  population_in_dwellings INTEGER,
  UNIQUE(reference_date,geographic_location)
);

create table if not exists data_science_workspace.building_populations(
  id SERIAL PRIMARY KEY,
  reference_date INTEGER,
  municipal_name INTEGER references data_science_workspace.municipal_district,
  dwellings_occupied_by_usual_residents INTEGER,
  population_in_dwellings INTEGER,
  UNIQUE(reference_date,municipal_name)
);

create table if not exists data_clean_room.buildings(
  id SERIAL PRIMARY KEY,
  longitude decimal(16,12),
  latitude decimal(16,12),
  csduid varchar(10),
  csdname varchar(100),
  data_prov varchar(100),
  build_id varchar(16),
  shape_length decimal(18,12),
  shape_footprint_area decimal(20,12),
  UNIQUE (build_id)
);

create table if not exists data_science_workspace.municipal_building(
  id SERIAL primary key,
  municipal_name INTEGER references data_science_workspace.municipal_district,
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
