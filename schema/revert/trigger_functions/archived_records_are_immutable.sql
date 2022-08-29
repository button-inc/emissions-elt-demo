-- Revert eed:trigger_functions/archived_records_are_immutable from pg

begin;

drop function eed_private.archived_records_are_immutable;

commit;
