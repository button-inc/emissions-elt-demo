-- Deploy eed:tables/indicator_detail_type to pg
-- requires: schemas/main

begin;

create table eed.indicator_detail_type(
  indicator_detail_type varchar(5) not null,
  unit_of_measure_code varchar(6) not null,
  unit_description varchar(50) not null,
  effective_date date not null,
  secondary_indicator_code varchar(6) not null,
  expiry_date date
);

select eed_private.upsert_timestamp_columns('eed', 'indicator_detail_type');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'indicator_detail_type', 'eed_internal');
perform eed_private.grant_permissions('insert', 'indicator_detail_type', 'eed_internal');
perform eed_private.grant_permissions('update', 'indicator_detail_type', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'indicator_detail_type', 'eed_admin');
perform eed_private.grant_permissions('insert', 'indicator_detail_type', 'eed_admin');
perform eed_private.grant_permissions('update', 'indicator_detail_type', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;
