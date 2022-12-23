-- Revert eed:add_table from pg

BEGIN;

DROP TABLE eed.trips;

COMMIT;
