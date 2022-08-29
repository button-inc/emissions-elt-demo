-- Verify eed:schema/eed on pg

begin;

select pg_catalog.has_schema_privilege('eed', 'usage');

rollback;
