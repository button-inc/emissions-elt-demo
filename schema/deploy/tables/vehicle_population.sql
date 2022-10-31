-- Deploy eed:tables/vehicle_population to pg
-- requires: schemas/main

begin;

create table eed.vehicle_population
(
  vehicle_use varchar(100),
  body_style varchar (100),
  electric_vehicle_flag varchar(10),
  fleet_flag varchar(10),
  hybrid_vehicle_flag varchar (10),
  make varchar(100),
  model varchar(100),
  model_year integer
  municipality varchar(1000),
  person_org_type varchar(1000),
  region varchar(1000),
  vehicle_count_year integer
  vehicle_count integer
);

do
$grant$
begin

-- Grant cif_internal permissions
perform eed_private.grant_permissions('select', 'vehicle_population', 'eed_admin');
perform eed_private.grant_permissions('insert', 'vehicle_population', 'eed_admin');
perform eed_private.grant_permissions('update', 'vehicle_population', 'eed-admin');

end
$grant$;

comment on table eed.vehicle_population is 'Table contains vehicle population data by make, model & year';
comment on column eed.vehicle_population.vehicle_use is 'How the vehicle is used (eg: personal, business)';
comment on column eed.vehicle_population.body_style is 'The body style of the vehicle (eg: TwoDoorCoupe, FourDoorSedan)';
comment on column eed.vehicle_population.electric_vehicle_flag is 'Is this vehicle electric';
comment on column eed.vehicle_population.electric_fleet_flag is 'Is this vehicle a part of a fleet';
comment on column eed.vehicle_population.hybrid_vehicle_flag is 'Is this vehicle a hybrid';
comment on column eed.vehicle_population.make is 'The make of the vehicle';
comment on column eed.vehicle_population.model is 'The model of the vehicle';
comment on column eed.vehicle_population.model_year is 'The year the vehicle was manufactured';
comment on column eed.vehicle_population.municipality is 'The municipality where the count was made';
comment on column eed.vehicle_population.person_org_type is 'The owning entity (eg: Person, External Organisation)';
comment on column eed.vehicle_population.region is 'The region where the count was made';
comment on column eed.vehicle_population.vehicle_count_year is 'The year the count was done';
comment on column eed.vehicle_population.vehicle_count is 'The number of vehicles counted';

commit;
