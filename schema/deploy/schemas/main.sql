-- Deploy eed:schema/eed to pg

begin;

create schema eed;
grant usage on schema eed to eed_internal, eed_external, eed_admin;
grant all on schema eed to eed_internal;
comment on schema eed is 'The main schema for the eed application.';

commit;
