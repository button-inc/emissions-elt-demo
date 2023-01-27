-- Deploy eed:tables/waste_data to pg

BEGIN;

create table if not exists data_science_workspace.regional_district(
  id SERIAL PRIMARY KEY,
  district_name TEXT not null,
  district_shape GEOMETRY(multipolygon, 3005),
  UNIQUE (district_name)
);

create table if not exists data_science_workspace.municipal_district(
  id SERIAL PRIMARY KEY,
  municipal_legal_name varchar(100),
  municipal_abbreviated_name varchar(100),
  municipal_shape GEOMETRY(multipolygon, 3005),
  regional_district INTEGER references data_science_workspace.regional_district,
  UNIQUE (municipal_legal_name)
);

create table if not exists data_clean_room.raw_regional_waste_data(
  id SERIAL PRIMARY key,
  regional_district_name text not null,
  reporting_year INTEGER,
  total_disposed_tonnes DECIMAL,
  population_count INTEGER,
  disposal_rate_kg DECIMAL,
  UNIQUE (regional_district_name, reporting_year)
);

create table if not exists data_science_workspace.regional_waste_data(
  id SERIAL PRIMARY Key,
  regional_district INTEGER references data_science_workspace.regional_district,
  year INTEGER,
  total_disposed_tonnes DECIMAL,
  population_count INTEGER,
  UNIQUE (regional_district, year)
);

-- dev roles
grant all on data_clean_room.raw_regional_waste_data, data_science_workspace.regional_district, data_science_workspace.municipal_district, data_science_workspace.regional_waste_data to eed_internal, eed_external, eed_admin;
-- -- analyst
grant all on data_clean_room.raw_regional_waste_data, data_science_workspace.regional_district, data_science_workspace.municipal_district, data_science_workspace.regional_waste_data to analyst;
-- manager
grant all on data_science_workspace.regional_district, data_science_workspace.municipal_district, data_science_workspace.regional_waste_data to manager;


COMMIT;
