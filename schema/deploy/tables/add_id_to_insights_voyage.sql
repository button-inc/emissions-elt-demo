-- Deploy eed:tables/add_id_to_insights_voyage to pg
-- requires: tables/insight-destination-processed@alpha-23-01-18

BEGIN;

ALTER TABLE if exists data_science_workspace.insights_voyage
  ADD COLUMN IF NOT EXISTS id SERIAL;

COMMIT;
