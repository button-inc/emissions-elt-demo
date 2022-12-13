-- Verify eed:tables/user on pg

begin;

select pg_catalog.has_table_privilege('eed.eed_user', 'select');

-- eed_internal Grants
select eed_private.verify_grant('select', 'eed_user', 'eed_internal');
select eed_private.verify_grant('insert', 'eed_user', 'eed_internal');
select eed_private.verify_grant('update', 'eed_user', 'eed_internal',
    ARRAY['given_name', 'family_name', 'email_address', 'created_at', 'updated_at', 'archived_at']);

-- eed_external Grants
select eed_private.verify_grant('select', 'eed_user', 'eed_external');
select eed_private.verify_grant('insert', 'eed_user', 'eed_external');
select eed_private.verify_grant('update', 'eed_user', 'eed_external',
    ARRAY['given_name', 'family_name', 'email_address', 'created_at', 'updated_at', 'archived_at']);

-- eed_admin Grants
select eed_private.verify_grant('select', 'eed_user', 'eed_admin');
select eed_private.verify_grant('insert', 'eed_user', 'eed_admin');
select eed_private.verify_grant('update', 'eed_user', 'eed_admin',
    ARRAY['given_name', 'family_name', 'email_address', 'created_at', 'updated_at', 'archived_at']);

rollback;
