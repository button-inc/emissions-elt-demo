-- Deploy eed:schema/eed_private to pg

begin;

create schema eed_private;
grant usage on schema eed_private to eed_internal, eed_external, eed_admin;
grant all on schema eed_private to eed_internal;
comment on schema eed_private is 'The private schema for the eed application. It contains utility functions which should not be available directly through the API.';

commit;
