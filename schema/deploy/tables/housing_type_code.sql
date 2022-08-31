-- Deploy eed:tables/housing_type_code to pg
-- requires: schemas/main

begin;

create table eed.housing_type_code(
  housing_type_code varchar(4) not null,
  housing_type_desc varchar(40) not null,
  effective_date date not null,
  expiry_date date
);

select eed_private.upsert_timestamp_columns('eed', 'housing_type_code');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'housing_type_code', 'eed_internal');
perform eed_private.grant_permissions('insert', 'housing_type_code', 'eed_internal');
perform eed_private.grant_permissions('update', 'housing_type_code', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'housing_type_code', 'eed_admin');
perform eed_private.grant_permissions('insert', 'housing_type_code', 'eed_admin');
perform eed_private.grant_permissions('update', 'housing_type_code', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;