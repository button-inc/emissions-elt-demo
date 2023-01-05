-- Deploy eed:users to pg

BEGIN;

SET client_min_messages = 'warning';

-- Create users table
CREATE TABLE eed.users (
    id integer primary key generated always as identity,
    username varchar(1000) not null,
    email varchar(1000),
    user_role varchar(1000)
);

-- Create unique index to enforce uniqueness constraint on fields
create unique index eed_user_username on eed.users(username);

-- Grant permissions for each table to roles. args = (permission, table, role). eed_app has the combined permissions of these roles.
do
$grant$
begin
-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'users', 'eed_admin');
perform eed_private.grant_permissions('insert', 'users', 'eed_admin');
perform eed_private.grant_permissions('update', 'users', 'eed_admin');
perform eed_private.grant_permissions('delete', 'users', 'eed_admin');

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'users', 'eed_internal');
perform eed_private.grant_permissions('insert', 'users', 'eed_internal');

-- Grant eed_external permissions
perform eed_private.grant_permissions('select', 'users', 'eed_external');
end
$grant$;

-- Enable row level security
alter table eed.users enable row level security;

comment on table eed.users is 'Table containing information about application users';
comment on column eed.users.id is 'Unique ID for the user';
comment on column eed.users.username is 'Unique username';
comment on column eed.users.email is 'Email account associated with user';
comment on column eed.users.user_role is 'Role determines user permissions';

COMMIT;
