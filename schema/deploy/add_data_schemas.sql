-- Deploy eed:add_data_schemas to pg

BEGIN;

create schema data_clean_room;
grant all on schema data_clean_room to eed_internal, eed_external, eed_admin;
grant all on schema data_clean_room to analyst;
grant all on schema data_clean_room to dropper;
comment on schema data_clean_room is 'The schema for collected data to be aggregated and anonymized.';

create schema data_science_workspace;
grant all on schema data_clean_room to eed_internal, eed_external, eed_admin;
grant all on schema data_clean_room to analyst;
grant all on schema data_clean_room to manager;
comment on schema data_science_workspace is 'The schema for anonymized data to be analyzed.';

create schema published_vault;
grant all on schema data_clean_room to eed_internal, eed_external, eed_admin;
grant all on schema data_clean_room to analyst;
grant all on schema data_clean_room to manager;
grant all on schema data_clean_room to dropper;
comment on schema published_vault is 'The schema for published data with public access.';

COMMIT;
