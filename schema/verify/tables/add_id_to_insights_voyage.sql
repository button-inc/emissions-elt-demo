-- Verify eed:tables/add_id_to_insights_voyage on pg

BEGIN;

select id
  from data_science_workspace.insights_voyage
  where false;

ROLLBACK;
