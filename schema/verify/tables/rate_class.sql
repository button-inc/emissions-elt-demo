-- Verify eed:tables/rate_class on pg

begin;

select pg_catalog.has_table_privilege('eed.rate_class', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'rate_class', 'eed_internal');
select eed_private.verify_grant('insert', 'rate_class', 'eed_internal');
select eed_private.verify_grant('update', 'rate_class', 'eed_internal');

-- eed_admin Grants
select eed_private.verify_grant('select', 'rate_class', 'eed_admin');
select eed_private.verify_grant('insert', 'rate_class', 'eed_admin');
select eed_private.verify_grant('update', 'rate_class', 'eed_admin');

rollback;
