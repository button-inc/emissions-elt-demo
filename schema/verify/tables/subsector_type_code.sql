-- Verify eed:tables/subsector_type_code on pg

begin;

select pg_catalog.has_table_privilege('eed.subsector_type_code', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'subsector_type_code', 'eed_internal');
select eed_private.verify_grant('insert', 'subsector_type_code', 'eed_internal');
select eed_private.verify_grant('update', 'subsector_type_code', 'eed_internal');

-- eed_admin Grants
select eed_private.verify_grant('select', 'subsector_type_code', 'eed_admin');
select eed_private.verify_grant('insert', 'subsector_type_code', 'eed_admin');
select eed_private.verify_grant('update', 'subsector_type_code', 'eed_admin');

rollback;