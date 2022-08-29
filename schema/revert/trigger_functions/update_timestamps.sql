-- Revert eed:trigger_functions/update_timestamps from pg

begin;

drop function eed_private.update_timestamps();

commit;
