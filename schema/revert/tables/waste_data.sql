-- Revert eed:tables/waste_data from pg

BEGIN;

drop table if exists data_science_workspace.regional_waste_data;
drop table if exists data_science_workspace.municipal_district;
drop table if exists data_science_workspace.regional_district;
drop table if exists data_clean_room.raw_regional_waste_data;

COMMIT;
