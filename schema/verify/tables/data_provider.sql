-- Verify eed:tables/data_provider on pg

begin;

select pg_catalog.has_table_privilege('eed.data_provider', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'data_provider', 'eed_internal');
select eed_private.verify_grant('insert', 'data_provider', 'eed_internal');
select eed_private.verify_grant('update', 'data_provider', 'eed_internal');

-- eed_admin Grants
select eed_private.verify_grant('select', 'data_provider', 'eed_admin');
select eed_private.verify_grant('insert', 'data_provider', 'eed_admin');
select eed_private.verify_grant('update', 'data_provider', 'eed_admin');

rollback;
