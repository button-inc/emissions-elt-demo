-- Deploy eed:insert_user to pg
-- requires: users

BEGIN;

SET client_min_messages = 'warning';

CREATE OR REPLACE FUNCTION eed_private.insert_user(
    username varchar(1000),
    email varchar(1000),
    user_role varchar(1000)
) RETURNS VOID LANGUAGE SQL SECURITY DEFINER AS $$
    INSERT INTO eed.users (username, email, user_role) VALUES($1, $2, $3);
$$;

COMMIT;
