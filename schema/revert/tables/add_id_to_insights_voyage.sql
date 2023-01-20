-- Revert eed:tables/add_id_to_insights_voyage from pg

BEGIN;

ALTER TABLE if exists data_science_workspace.insights_voyage
  DROP COLUMN IF EXISTS id;

COMMIT;
