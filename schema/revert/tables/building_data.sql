-- Revert eed:tables/building_data from pg

BEGIN;

DROP TABLE data_science_workspace.municipal_building;
DROP TABLE data_science_workspace.building_populations;
DROP TABLE data_clean_room.buildings;
DROP TABLE data_clean_room.dwelling_populations;

COMMIT;
