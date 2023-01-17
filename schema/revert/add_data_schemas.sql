-- Revert eed:add_data_schemas from pg

BEGIN;

drop schema published_vault;

drop schema data_science_workspace;

drop schema data_clean_room;

COMMIT;
