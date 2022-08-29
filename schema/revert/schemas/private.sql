-- Revert eed:schema/eed_private from pg

begin;

drop schema eed_private;

commit;
