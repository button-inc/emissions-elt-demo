-- Verify eed:util_functions/verify_function_not_present on pg

begin;

select pg_get_functiondef('eed_private.verify_function_not_present(text)'::regprocedure);

rollback;
