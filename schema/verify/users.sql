-- Verify eed:users on pg

begin;

select pg_catalog.has_table_privilege('eed.users', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'users', 'eed_internal');
select eed_private.verify_grant('insert', 'users', 'eed_internal');

-- eed_external Grants
select eed_private.verify_grant('select', 'users', 'eed_external');

-- eed_admin Grants
select eed_private.verify_grant('select', 'users', 'eed_admin');
select eed_private.verify_grant('insert', 'users', 'eed_admin');
select eed_private.verify_grant('update', 'users', 'eed_admin');
select eed_private.verify_grant('delete', 'users', 'eed_admin');

rollback;
