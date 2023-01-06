-- Deploy eed:postgis_extension to pg

BEGIN;

CREATE EXTENSION if not exists postgis;

COMMIT;
