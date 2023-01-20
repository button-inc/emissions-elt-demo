-- Verify eed:computed_columns/voyage_combined_id on pg

BEGIN;

select pg_get_functiondef('data_science_workspace.insights_voyage_voyage_id(data_science_workspace.insights_voyage)'::regprocedure);

ROLLBACK;
