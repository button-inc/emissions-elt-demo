-- Verify eed:schema/eed_private on pg

begin;

select pg_catalog.has_schema_privilege('eed_private', 'usage');

rollback;
