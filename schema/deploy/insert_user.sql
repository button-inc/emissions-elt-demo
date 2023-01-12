-- Deploy eed:insert_user to pg
-- requires: users

BEGIN;

SET client_min_messages = 'warning';

CREATE OR REPLACE FUNCTION eed_private.insert_user(
    email varchar(1000),
    userRole varchar(1000)
) RETURNS VOID LANGUAGE SQL SECURITY DEFINER AS $$
    INSERT INTO eed.permissions (email, userRole) VALUES($1, $2);
$$;

COMMIT;
