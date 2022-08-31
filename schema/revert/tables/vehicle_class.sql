-- Revert eed:tables/vehicle_class from pg

BEGIN;

drop table eed.vehicle_class;

COMMIT;
