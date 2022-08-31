-- Verify eed:tables/sector_type_code on pg

begin;

select pg_catalog.has_table_privilege('eed.sector_type_code', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'sector_type_code', 'eed_internal');
select eed_private.verify_grant('insert', 'sector_type_code', 'eed_internal');
select eed_private.verify_grant('update', 'sector_type_code', 'eed_internal');

-- eed_admin Grants
select eed_private.verify_grant('select', 'sector_type_code', 'eed_admin');
select eed_private.verify_grant('insert', 'sector_type_code', 'eed_admin');
select eed_private.verify_grant('update', 'sector_type_code', 'eed_admin');

rollback;
