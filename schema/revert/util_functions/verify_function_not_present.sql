-- Revert eed:util_functions/verify_function_not_present from pg

begin;

drop function eed_private.verify_function_not_present(text);

commit;
