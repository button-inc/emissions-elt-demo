-- Revert eed:util_functions/verify_grant from pg

begin;

drop function eed_private.verify_grant(text, text, text, text);
drop function eed_private.verify_grant(text, text, text, text[], text);

commit;
