-- Verify eed:tables/indicator_detail_type on pg

begin;

select pg_catalog.has_table_privilege('eed.indicator_detail_type', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'indicator_detail_type', 'eed_internal');
select eed_private.verify_grant('insert', 'indicator_detail_type', 'eed_internal');
select eed_private.verify_grant('update', 'indicator_detail_type', 'eed_internal');

-- eed_admin Grants
select eed_private.verify_grant('select', 'indicator_detail_type', 'eed_admin');
select eed_private.verify_grant('insert', 'indicator_detail_type', 'eed_admin');
select eed_private.verify_grant('update', 'indicator_detail_type', 'eed_admin');

rollback;
