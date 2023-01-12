-- Deploy eed:users to pg

BEGIN;

SET client_min_messages = 'warning';

-- Create permissions table
CREATE TABLE eed.permissions (
    id integer primary key generated always as identity,
    email varchar(1000),
    userRole varchar(1000)
);

-- Grant permissions for each table to roles. args = (permission, table, role). eed_app has the combined permissions of these roles.
do
$grant$
begin
-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'permissions', 'eed_admin');
perform eed_private.grant_permissions('insert', 'permissions', 'eed_admin');
perform eed_private.grant_permissions('update', 'permissions', 'eed_admin');
perform eed_private.grant_permissions('delete', 'permissions', 'eed_admin');

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'permissions', 'eed_internal');
perform eed_private.grant_permissions('insert', 'permissions', 'eed_internal');
perform eed_private.grant_permissions('update', 'permissions', 'eed_internal');
perform eed_private.grant_permissions('delete', 'permissions', 'eed_internal');

-- Grant eed_external permissions
perform eed_private.grant_permissions('select', 'permissions', 'eed_external');
end
$grant$;

comment on table eed.permissions is 'Table matching emails to permission groups';
comment on column eed.permissions.id is 'Unique ID for the user';
comment on column eed.permissions.email is 'Email account associated with user';
comment on column eed.permissions.userRole is 'userRole determines user permissions group';

COMMIT;
