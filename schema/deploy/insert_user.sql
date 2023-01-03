-- Deploy eed:insert_user to pg
-- requires: users

BEGIN;

SET client_min_messages = 'warning';

CREATE EXTENSION "uuid-ossp";

CREATE OR REPLACE FUNCTION eed_private.insert_user(
    username varchar(1000),
    password varchar(1000),
    email varchar(1000)
) RETURNS VOID LANGUAGE SQL SECURITY DEFINER AS $$
    INSERT INTO eed.users (uuid, username, password, email) VALUES((SELECT uuid_generate_v4()), $1, md5($2), $3);
$$;

COMMIT;
