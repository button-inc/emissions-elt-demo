-- Deploy eed:tables/org_unit to pg
-- requires: schemas/main

begin;

create table eed.org_unit(
  org_unit_id numeric(10) not null,
  unit_name varchar(100) not null,
  spatial_link_value varchar(200),
  effective_date date not null,
  expiry_date date,
  or_unit_id_is_part_of numeric(10),
  org_unit_type_code numeric(10) not null,
  reporting_level numeric(1)  
);

select eed_private.upsert_timestamp_columns('eed', 'org_unit');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'org_unit', 'eed_internal');
perform eed_private.grant_permissions('insert', 'org_unit', 'eed_internal');
perform eed_private.grant_permissions('update', 'org_unit', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'org_unit', 'eed_admin');
perform eed_private.grant_permissions('insert', 'org_unit', 'eed_admin');
perform eed_private.grant_permissions('update', 'org_unit', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;
