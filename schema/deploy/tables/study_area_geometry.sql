-- Deploy eed:tables/study_area_geometry to pg

BEGIN;

create table if not exists  data_science_workspace.study_area_geometry(
  area_name TEXT primary key references data_science_workspace.study_area(area_name),
  hex_geometry GEOMETRY(multipolygon, 3005) not null
);

-- dev roles
grant all on data_science_workspace.study_area_geometry to eed_internal, eed_external, eed_admin;
-- -- analyst
grant all on data_science_workspace.study_area_geometry to analyst;
-- manager
grant all on data_science_workspace.study_area_geometry to manager;

COMMIT;
