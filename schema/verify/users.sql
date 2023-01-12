-- Verify eed:users on pg

begin;

select pg_catalog.has_table_privilege('eed.permissions', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'permissions', 'eed_internal');
select eed_private.verify_grant('insert', 'permissions', 'eed_internal');
select eed_private.verify_grant('update', 'permissions', 'eed_internal');
select eed_private.verify_grant('delete', 'permissions', 'eed_internal');

-- eed_external Grants
select eed_private.verify_grant('select', 'permissions', 'eed_external');

-- eed_admin Grants
select eed_private.verify_grant('select', 'permissions', 'eed_admin');
select eed_private.verify_grant('insert', 'permissions', 'eed_admin');
select eed_private.verify_grant('update', 'permissions', 'eed_admin');
select eed_private.verify_grant('delete', 'permissions', 'eed_admin');

rollback;
