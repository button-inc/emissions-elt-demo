-- Deploy eed:tables/insight-destination-processed to pg

BEGIN;

create table if not exists eed.study_area(
  study_area_id SERIAL PRIMARY KEY,
  area_name TEXT not null,
  updated_at TIMESTAMP not null DEFAULT NOW(),
  UNIQUE (area_name)
);

-- Primary key is a pair of (origin_area_id, destination_area_id)
create table if not exists eed.insights_voyage(
  origin_area_id INTEGER REFERENCES eed.study_area(study_area_id),
  destination_area_id INTEGER REFERENCES eed.study_area(study_area_id),
  voyage_count INTEGER not null CHECK (voyage_count >= 0),
  start_time TIMESTAMP not null,
  updated_at TIMESTAMP not null DEFAULT NOW(),
  PRIMARY KEY (origin_area_id, destination_area_id)
);

create table if not exists eed.area_distance_map(
  origin_area_id INTEGER REFERENCES eed.study_area(study_area_id),
  destination_area_id INTEGER REFERENCES eed.study_area(study_area_id),
  distance INTEGER not null CHECK (distance >= 0),
  updated_at TIMESTAMP not null DEFAULT NOW(),
  PRIMARY KEY (origin_area_id, destination_area_id)
);

COMMIT;
