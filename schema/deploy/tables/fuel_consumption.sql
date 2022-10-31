-- Deploy eed:tables/fuel_consumption to pg
-- requires: schemas/main

begin;

create table eed.fuel_consumption
(
  year integer,
  make varchar(1000),
  model varchar(1000),
  vehicle_class varchar(1000),
  engine_size numeric,
  cylinders integer,
  transmission varchar(100),
  fuel_type varchar(100)
  fuel_consumption_city numeric,
  fuel_consumption_hwy numeric,
  fuel_consumption_comb numeric
  fuel_consumption_comb_mpg numeric
  co2_emissions numeric
  co2_rating integer
  smog_rating integer
);

create unique index fuel_consumption_year_make_model on eed.fuel_consumption(year, make, model);

do
$grant$
begin

-- Grant cif_internal permissions
perform eed_private.grant_permissions('select', 'fuel_consumption', 'eed_admin');
perform eed_private.grant_permissions('insert', 'fuel_consumption', 'eed_admin');
perform eed_private.grant_permissions('update', 'fuel_consumption', 'eed-admin');

end
$grant$;

comment on table eed.fuel_consumption is 'Table contains vehicle fuel consumption data by make, model & year';
comment on column eed.fuel_consumption.year is 'The year the vehicle was manufactured';
comment on column eed.fuel_consumption.make is 'The make of the vehicle';
comment on column eed.fuel_consumption.model is 'The model of the vehicle';
comment on column eed.fuel_consumption.vehicle_class is 'The class of the vehicle (examples: compact, mid-size, full-size)';
comment on column eed.fuel_consumption.engine_size is 'The size of the engine in Litres';
comment on column eed.fuel_consumption.transmission is 'The number of cylinders in the vehicles engine';
comment on column eed.fuel_consumption.year is 'The size of the engine in Litres';

commit;
