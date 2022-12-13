-- Deploy eed:tables/postal_code to pg
-- requires: schemas/main

begin;

create table eed.postal_code(
  postal_code varchar(6) not null,
  effective_date date not null,
  expiry_date date
);

select eed_private.upsert_timestamp_columns('eed', 'postal_code');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'postal_code', 'eed_internal');
perform eed_private.grant_permissions('insert', 'postal_code', 'eed_internal');
perform eed_private.grant_permissions('update', 'postal_code', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'postal_code', 'eed_admin');
perform eed_private.grant_permissions('insert', 'postal_code', 'eed_admin');
perform eed_private.grant_permissions('update', 'postal_code', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;
