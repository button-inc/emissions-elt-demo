-- Deploy eed:tables/eed_user to pg

begin;
create table eed.eed_user
(
  id integer primary key generated always as identity,
  uuid uuid not null,
  given_name varchar(1000),
  family_name varchar(1000),
  email_address varchar(1000)
);

select eed_private.upsert_timestamp_columns('eed', 'eed_user');

create unique index eed_user_uuid on eed.eed_user(uuid);
create unique index eed_user_email_address on eed.eed_user(email_address);

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'eed_user', 'eed_internal');
perform eed_private.grant_permissions('insert', 'eed_user', 'eed_internal');
perform eed_private.grant_permissions('update', 'eed_user', 'eed_internal',
  ARRAY['given_name', 'family_name', 'email_address', 'created_at', 'updated_at', 'archived_at']);

-- Grant eed_external permissions
perform eed_private.grant_permissions('select', 'eed_user', 'eed_external');
perform eed_private.grant_permissions('insert', 'eed_user', 'eed_external');
perform eed_private.grant_permissions('update', 'eed_user', 'eed_external',
  ARRAY['given_name', 'family_name', 'email_address', 'created_at', 'updated_at', 'archived_at']);

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'eed_user', 'eed_admin');
perform eed_private.grant_permissions('insert', 'eed_user', 'eed_admin');
perform eed_private.grant_permissions('update', 'eed_user', 'eed_admin',
  ARRAY['given_name', 'family_name', 'email_address', 'created_at', 'updated_at', 'archived_at']);


end
$grant$;

-- Enable row-level security
alter table eed.eed_user enable row level security;

comment on table eed.eed_user is 'Table containing information about the application''s users ';
comment on column eed.eed_user.id is 'Unique ID for the user';
comment on column eed.eed_user.uuid is 'Universally Unique ID for the user, defined by the single sign-on provider';
comment on column eed.eed_user.given_name is 'User''s first name';
comment on column eed.eed_user.family_name is 'User''s last name';
comment on column eed.eed_user.email_address is 'User''s email address';

commit;
