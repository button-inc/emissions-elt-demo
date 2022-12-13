-- Revert eed:tables/eed_user from pg

begin;

drop table eed.eed_user;

commit;
