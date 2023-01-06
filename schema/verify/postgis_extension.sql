-- Verify eed:postgis_extension on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'postgis';
do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'geometry'
    ), 'type "geometry" is not defined, therefore PostGIS extension is not active';
  end;
$$;

ROLLBACK;
