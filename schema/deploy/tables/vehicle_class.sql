-- Deploy eed:tables/vehicle_class to pg
-- requires: schemas/main

begin;

create table eed.vehicle_class(
  vehicle_class_name varchar(100) not null,
  vehicl_class_code varchar(10) not null,
  class_source varchar(50),
  effective_date date not null,
  expiry_date date,
  subsector_type_code varchar(8)
);

select eed_private.upsert_timestamp_columns('eed', 'vehicle_class');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'vehicle_class', 'eed_internal');
perform eed_private.grant_permissions('insert', 'vehicle_class', 'eed_internal');
perform eed_private.grant_permissions('update', 'vehicle_class', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'vehicle_class', 'eed_admin');
perform eed_private.grant_permissions('insert', 'vehicle_class', 'eed_admin');
perform eed_private.grant_permissions('update', 'vehicle_class', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;
