-- Revert eed:tables/housing_type_code from pg

begin;

drop table eed.housing_type_code;

commit;
