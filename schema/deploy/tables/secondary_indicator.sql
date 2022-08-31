-- Deploy eed:tables/secondary_indicator to pg
-- requires: schemas/main

begin;

create table eed.secondary_indicator(
  secondary_indicator_code varchar(6) not null,
  desccription varchar(50) not null,
  effective_date date not null,
  sector_type_code varchar(6) not null,
  inital_data_year numeric(4),
  data_frequency_years numeric(2),
  reporting_frequency_years numeric(2),
  expiry_date date,
  report_level varchar(6) not null,
  sort_order numeric(3),
  placeholder_txt varchar(250)
);

select eed_private.upsert_timestamp_columns('eed', 'secondary_indicator');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'secondary_indicator', 'eed_internal');
perform eed_private.grant_permissions('insert', 'secondary_indicator', 'eed_internal');
perform eed_private.grant_permissions('update', 'secondary_indicator', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'secondary_indicator', 'eed_admin');
perform eed_private.grant_permissions('insert', 'secondary_indicator', 'eed_admin');
perform eed_private.grant_permissions('update', 'secondary_indicator', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;
