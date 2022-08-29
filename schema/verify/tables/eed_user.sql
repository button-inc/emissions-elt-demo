-- Verify eed:tables/user on pg

begin;

select pg_catalog.has_table_privilege('eed.user', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'user', 'eed_internal');
select eed_private.verify_grant('insert', 'user', 'eed_internal');
select eed_private.verify_grant('update', 'user', 'eed_internal');

-- eed_admin Grants
select eed_private.verify_grant('select', 'user', 'eed_admin');
select eed_private.verify_grant('insert', 'user', 'eed_admin');
select eed_private.verify_grant('update', 'user', 'eed_admin');

rollback;
