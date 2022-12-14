-- Revert eed:tables/fuel_consumption from pg

begin;

drop table eed.fuel_consumption;

commit;
