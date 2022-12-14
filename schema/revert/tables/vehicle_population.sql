-- Revert eed:tables/vehicle_population from pg

begin;

drop table eed.vehicle_population;

commit;
