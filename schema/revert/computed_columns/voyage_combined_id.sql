-- Revert eed:computed_columns/voyage_combined_id from pg

BEGIN;

drop function data_science_workspace.insights_voyage_voyage_id;

COMMIT;
