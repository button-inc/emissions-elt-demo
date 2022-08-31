-- Deploy eed:tables/livestock_type_code to pg
-- requires: schemas/main

begin;

create table eed.livestock_type_code(
  livestock_type_code numeric(3) not null,
  livestock_type_desc varchar(100) not null,
  effective_date date not null,
  expiry_date date
);

select eed_private.upsert_timestamp_columns('eed', 'livestock_type_code');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'livestock_type_code', 'eed_internal');
perform eed_private.grant_permissions('insert', 'livestock_type_code', 'eed_internal');
perform eed_private.grant_permissions('update', 'livestock_type_code', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'livestock_type_code', 'eed_admin');
perform eed_private.grant_permissions('insert', 'livestock_type_code', 'eed_admin');
perform eed_private.grant_permissions('update', 'livestock_type_code', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;
