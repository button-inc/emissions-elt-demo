-- Verify eed:create-roles on pg

begin;

do
$verify$
begin


  if(select not exists(select true from pg_roles where rolname='eed_internal')) then
    raise exception 'role eed_internal does not exist.';

  elsif(select not exists(select true from pg_roles where rolname='eed_external')) then
    raise exception 'role eed_external does not exist.';

  elsif(select not exists(select true from pg_roles where rolname='eed_admin')) then
    raise exception 'role eed_admin does not exist.';

  elsif(select not exists(select true from pg_roles where rolname='analyst')) then
    raise exception 'role analyst does not exist.';

  elsif(select not exists(select true from pg_roles where rolname='manager')) then
    raise exception 'role manager does not exist.';

  elsif(select not exists(select true from pg_roles where rolname='dropper')) then
    raise exception 'role dropper does not exist.';


  end if;

end
$verify$;

rollback;
