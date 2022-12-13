-- Deploy eed:tables/data_provider to pg

begin;

create table eed.data_provider(
  data_proveder_id integer primary key,
  provider_name varchar(200) not null,
  contact_name varchar(200),
  phone varchar(100) constraint e164_format check (phone ~ '^\+\d{1,15}$'),
  contact_email varchar(200),
  effective_date date not null,
  expiry_date date
);

select eed_private.upsert_timestamp_columns('eed', 'data_provider');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'data_provider', 'eed_internal');
perform eed_private.grant_permissions('insert', 'data_provider', 'eed_internal');
perform eed_private.grant_permissions('update', 'data_provider', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'data_provider', 'eed_admin');
perform eed_private.grant_permissions('insert', 'data_provider', 'eed_admin');
perform eed_private.grant_permissions('update', 'data_provider', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;