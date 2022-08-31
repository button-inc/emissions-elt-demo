-- Deploy eed:tables/subsecondary_indicator to pg
-- requires: schemas/main

begin;

create table eed.subsecondary_indicator(
  subsecondary_indicator_code varchar(6) not null,
  desccription varchar(50) not null,
  effective_date date not null,
  secondary_indicator_code varchar(6) not null,
  expiry_date date,
  sort_order numeric(3),
  change_increase_effect varchar(3),
  report_subgroup_code varchar(50)
);

select eed_private.upsert_timestamp_columns('eed', 'subsecondary_indicator');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'subsecondary_indicator', 'eed_internal');
perform eed_private.grant_permissions('insert', 'subsecondary_indicator', 'eed_internal');
perform eed_private.grant_permissions('update', 'subsecondary_indicator', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'subsecondary_indicator', 'eed_admin');
perform eed_private.grant_permissions('insert', 'subsecondary_indicator', 'eed_admin');
perform eed_private.grant_permissions('update', 'subsecondary_indicator', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;
