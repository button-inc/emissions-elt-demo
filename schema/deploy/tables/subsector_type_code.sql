-- Deploy eed:tables/subsector_type_code to pg
-- requires: schemas/main

begin;

create table eed.subsector_type_code(
  subsector_type_code varchar(6) not null,
  subsector_type_desc varchar(50) not null,
  effective_date date not null,
  expiry_date date,
  sector_type_code varchar(6) not null,
  report_level varchar(6) not null,
  sort_order numeric(3)
);

select eed_private.upsert_timestamp_columns('eed', 'subsector_type_code');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'subsector_type_code', 'eed_internal');
perform eed_private.grant_permissions('insert', 'subsector_type_code', 'eed_internal');
perform eed_private.grant_permissions('update', 'subsector_type_code', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'subsector_type_code', 'eed_admin');
perform eed_private.grant_permissions('insert', 'subsector_type_code', 'eed_admin');
perform eed_private.grant_permissions('update', 'subsector_type_code', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;

