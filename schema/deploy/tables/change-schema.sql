-- Deploy eed:tables/change-schema to pg
-- requires: add_data_schemas

BEGIN;

alter table eed.study_area set schema data_science_workspace;
-- alter table eed.study_area set schema data_

COMMIT;
