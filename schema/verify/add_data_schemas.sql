-- Verify eed:add_data_schemas on pg

BEGIN;

select pg_catalog.has_schema_privilege('data_clean_room', 'usage');

select pg_catalog.has_schema_privilege('data_science_workspace', 'usage');

select pg_catalog.has_schema_privilege('published_vault', 'usage');

ROLLBACK;
