-- Deploy eed:add_table to pg

BEGIN;

SET client_min_messages = 'warning';

CREATE TABLE eed.trips (
    id      BIGSERIAL       PRIMARY KEY,
    trip_start   varchar(1000)  NOT NULL,
    trip_end     varchar(1000)  NOT NULL,
    timestamp    TIMESTAMPTZ    NOT NULL DEFAULT clock_timestamp()
);

COMMIT;
