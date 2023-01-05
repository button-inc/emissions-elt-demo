-- Deploy eed:create-roles to pg

begin;

SET client_min_messages = 'warning';

-- The create roles affects the database globally. Cannot drop the roles once created.
do
$do$
begin

  if not exists (
    select true
    from   pg_catalog.pg_roles
    where  rolname = 'eed_internal') then

    create role eed_internal;
  end if;

  alter role eed_internal WITH LOGIN PASSWORD 'secret';

  if not exists (
    select true
    from   pg_catalog.pg_roles
    where  rolname = 'eed_external') then

    create role eed_external;
  end if;

  if not exists (
    select true
    from   pg_catalog.pg_roles
    where  rolname = 'eed_admin') then

    create role eed_admin;
  end if;

  if not exists (
    select true
    from   pg_catalog.pg_roles
    where  rolname = 'eed_app') then

    create user eed_app;
  end if;

  grant eed_admin, eed_internal, eed_external to eed_app;
  execute format('grant create, connect on database %I to eed_app', current_database());

end
$do$;

commit;
