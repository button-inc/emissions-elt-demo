-- Revert eed:util_functions/grant_permissions from pg

begin;

drop function eed_private.grant_permissions(text, text, text, text);
drop function eed_private.grant_permissions(text, text, text, text[], text);

commit;
