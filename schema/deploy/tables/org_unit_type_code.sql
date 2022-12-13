-- Deploy eed:tables/org_unit_type_code to pg
-- requires: schemas/main

begin;

create table eed.org_unit_type_code(
  org_unit_type_code numeric(10) not null,
  org_unit_type_name varchar(50) not null,
  spatial_data_source varchar(200),
  spatial_link_field varchar(200),
  effective_date date not null,
  expiry_date date
);

select eed_private.upsert_timestamp_columns('eed', 'org_unit_type_code');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'org_unit_type_code', 'eed_internal');
perform eed_private.grant_permissions('insert', 'org_unit_type_code', 'eed_internal');
perform eed_private.grant_permissions('update', 'org_unit_type_code', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'org_unit_type_code', 'eed_admin');
perform eed_private.grant_permissions('insert', 'org_unit_type_code', 'eed_admin');
perform eed_private.grant_permissions('update', 'org_unit_type_code', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;
