-- Verify eed:tables/secondary_indicator on pg

begin;

select pg_catalog.has_table_privilege('eed.secondary_indicator', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'secondary_indicator', 'eed_internal');
select eed_private.verify_grant('insert', 'secondary_indicator', 'eed_internal');
select eed_private.verify_grant('update', 'secondary_indicator', 'eed_internal');

-- eed_admin Grants
select eed_private.verify_grant('select', 'secondary_indicator', 'eed_admin');
select eed_private.verify_grant('insert', 'secondary_indicator', 'eed_admin');
select eed_private.verify_grant('update', 'secondary_indicator', 'eed_admin');

rollback;
