-- Revert eed:tables/measurement_type_code from pg

BEGIN;

drop table eed.measurement_type_code;

COMMIT;
