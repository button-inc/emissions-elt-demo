-- Deploy eed:tables/insight-destination-processed to pg

BEGIN;

create table if not exists data_science_workspace.study_area(
  study_area_id SERIAL PRIMARY KEY,
  area_name TEXT not null,
  updated_at TIMESTAMP not null DEFAULT NOW(),
  UNIQUE (area_name)
);

-- Primary key is a pair of (origin_area_id, destination_area_id)
create table if not exists data_science_workspace.insights_voyage(
  origin_area_id INTEGER REFERENCES data_science_workspace.study_area(study_area_id),
  destination_area_id INTEGER REFERENCES data_science_workspace.study_area(study_area_id),
  voyage_count INTEGER not null CHECK (voyage_count >= 0),
  start_time TIMESTAMP not null,
  updated_at TIMESTAMP not null DEFAULT NOW(),
  PRIMARY KEY (origin_area_id, destination_area_id)
);

-- Removes vestigal tables if they exist
drop table if exists eed.insights_voyage;
drop table if exists eed.area_distance_map;
drop table if exists eed.study_area;

COMMIT;
