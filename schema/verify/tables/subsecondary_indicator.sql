-- Verify eed:tables/subsecondary_indicator on pg

begin;

select pg_catalog.has_table_privilege('eed.subsecondary_indicator', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'subsecondary_indicator', 'eed_internal');
select eed_private.verify_grant('insert', 'subsecondary_indicator', 'eed_internal');
select eed_private.verify_grant('update', 'subsecondary_indicator', 'eed_internal');

-- eed_admin Grants
select eed_private.verify_grant('select', 'subsecondary_indicator', 'eed_admin');
select eed_private.verify_grant('insert', 'subsecondary_indicator', 'eed_admin');
select eed_private.verify_grant('update', 'subsecondary_indicator', 'eed_admin');

rollback;

