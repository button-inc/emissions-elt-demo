-- Revert eed:schema/eed from pg

begin;

drop schema eed;

commit;
