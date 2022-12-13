-- Deploy eed:tables/rate_class to pg
-- requires: schemas/main

begin;

create table eed.rate_class(
  rate_class numeric(3) not null,
  rate_class_meaning varchar(120) not null,
  personal_work_indicator varchar(1),
  effective_date date not null,
  expiry_date date
);

select eed_private.upsert_timestamp_columns('eed', 'rate_class');

do
$grant$
begin

-- Grant eed_internal permissions
perform eed_private.grant_permissions('select', 'rate_class', 'eed_internal');
perform eed_private.grant_permissions('insert', 'rate_class', 'eed_internal');
perform eed_private.grant_permissions('update', 'rate_class', 'eed_internal');

-- Grant eed_admin permissions
perform eed_private.grant_permissions('select', 'rate_class', 'eed_admin');
perform eed_private.grant_permissions('insert', 'rate_class', 'eed_admin');
perform eed_private.grant_permissions('update', 'rate_class', 'eed_admin');

-- Grant eed_external no permissions
-- Grant eed_guest no permissions

end
$grant$;

commit;
