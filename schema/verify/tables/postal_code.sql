-- Verify eed:tables/postal_code on pg

begin;

select pg_catalog.has_table_privilege('eed.postal_code', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'postal_code', 'eed_internal');
select eed_private.verify_grant('insert', 'postal_code', 'eed_internal');
select eed_private.verify_grant('update', 'postal_code', 'eed_internal');

-- eed_admin Grants
select eed_private.verify_grant('select', 'postal_code', 'eed_admin');
select eed_private.verify_grant('insert', 'postal_code', 'eed_admin');
select eed_private.verify_grant('update', 'postal_code', 'eed_admin');

rollback;

