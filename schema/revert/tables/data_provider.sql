-- Revert eed:tables/data_provider from pg

begin;

drop table eed.data_provider;

commit;
