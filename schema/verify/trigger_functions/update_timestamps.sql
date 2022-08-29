-- Verify eed:function_update_timestamps on pg

begin;

select pg_get_functiondef('eed_private.update_timestamps()'::regprocedure);

rollback;
