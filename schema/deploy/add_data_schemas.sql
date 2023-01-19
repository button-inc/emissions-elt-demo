-- Deploy eed:add_data_schemas to pg

BEGIN;

create schema data_clean_room;
-- dev roles
grant all on schema data_clean_room to eed_internal, eed_external, eed_admin;
grant select on all tables in schema data_clean_room to eed_internal, eed_external, eed_admin;
-- analyst
grant all on schema data_clean_room to analyst;
grant select on all tables in schema data_clean_room to analyst;
grant insert on all tables in schema data_clean_room to analyst;
grant update on all tables in schema data_clean_room to analyst;
grant delete on all tables in schema data_clean_room to analyst;
-- dropper
grant all on schema data_clean_room to dropper;
grant select on all tables in schema data_clean_room to dropper;
grant insert on all tables in schema data_clean_room to dropper;

comment on schema data_clean_room is 'The schema for collected data to be aggregated and anonymized.';

create schema data_science_workspace;

-- dev roles
grant all on schema data_science_workspace to eed_internal, eed_external, eed_admin;
grant select on all tables in schema data_science_workspace to eed_internal, eed_external, eed_admin;
-- analyst
grant all on schema data_science_workspace to analyst;
grant select on all tables in schema data_science_workspace to analyst;
grant insert on all tables in schema data_science_workspace to analyst;
grant update on all tables in schema data_science_workspace to analyst;
grant delete on all tables in schema data_science_workspace to analyst;
-- manager
grant all on schema data_science_workspace to manager;
grant select on all tables in schema data_science_workspace to manager;

comment on schema data_science_workspace is 'The schema for anonymized data to be analyzed.';

create schema published_vault;
-- dev roles
grant all on schema published_vault to eed_internal, eed_external, eed_admin;
grant select on all tables in schema published_vault to eed_internal, eed_external, eed_admin;
-- analyst
grant all on schema published_vault to analyst;
grant select on all tables in schema published_vault to analyst;
grant insert on all tables in schema published_vault to analyst;
grant update on all tables in schema published_vault to analyst;
grant delete on all tables in schema published_vault to analyst;
-- manager
grant all on schema published_vault to manager;
grant select on all tables in schema published_vault to manager;
-- dropper
grant all on schema published_vault to dropper;
grant select on all tables in schema published_vault to dropper;

comment on schema published_vault is 'The schema for published data with public access.';

COMMIT;
