-- Verify eed:tables/vehicle_class on pg

begin;

select pg_catalog.has_table_privilege('eed.vehicle_class', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'vehicle_class', 'eed_internal');
select eed_private.verify_grant('insert', 'vehicle_class', 'eed_internal');
select eed_private.verify_grant('update', 'vehicle_class', 'eed_internal');

-- eed_admin Grants
select eed_private.verify_grant('select', 'vehicle_class', 'eed_admin');
select eed_private.verify_grant('insert', 'vehicle_class', 'eed_admin');
select eed_private.verify_grant('update', 'vehicle_class', 'eed_admin');

rollback;