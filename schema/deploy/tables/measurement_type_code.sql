-- Deploy eed:tables/measurement_type_code to pg
-- requires: schemas/main

begin;

create table eed.measurement_type_code(
  measurement_type_code varchar(6) not null,
  measurement_type_desc varchar(50) not null,
  measurement_unit varchar(5),
  measurement_unit_desc varchar(50),
  effective_date date not null,
  expiry_date date,
  sort_order numeric(3) not null,
  energy_conversion_factor numeric(8, 4)
);

select eed_private.upsert_timestamp_columns('eed', 'measurement_type_code');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'measurement_type_code', 'eed_internal');
perform eed_private.grant_permissions('insert', 'measurement_type_code', 'eed_internal');
perform eed_private.grant_permissions('update', 'measurement_type_code', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'measurement_type_code', 'eed_admin');
perform eed_private.grant_permissions('insert', 'measurement_type_code', 'eed_admin');
perform eed_private.grant_permissions('update', 'measurement_type_code', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;