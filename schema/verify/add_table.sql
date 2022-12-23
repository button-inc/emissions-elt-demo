-- Verify eed:add_table on pg

BEGIN;

SELECT id
      , trip_start
      , trip_end
      , timestamp
    FROM eed.trips
  WHERE FALSE;

ROLLBACK;
