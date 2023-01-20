-- Deploy eed:computed_columns/voyage_combined_id to pg

BEGIN;

create or replace function data_science_workspace.insights_voyage_voyage_id(iv data_science_workspace.insights_voyage)
returns varchar as $computed_column$
  select iv.origin_area_id || '_' || iv.destination_area_id;
$computed_column$ language sql stable;

grant execute on function data_science_workspace.insights_voyage_voyage_id to eed_internal, eed_external, eed_admin;
grant execute on function data_science_workspace.insights_voyage_voyage_id to analyst, manager;

comment on function data_science_workspace.insights_voyage_voyage_id is 'Computed column for postgraphile to retrieve the id pair of the insights voyage';

COMMIT;
