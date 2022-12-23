-- Verify eed:verify_grant on pg

begin;

select pg_get_functiondef('eed_private.verify_grant(text,text,text,text)'::regprocedure);
select pg_get_functiondef('eed_private.verify_grant(text,text,text,text[],text)'::regprocedure);

rollback;
