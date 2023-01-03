-- Deploy eed:change_password to pg
-- requires: users

BEGIN;

SET client_min_messages = 'warning';

CREATE OR REPLACE FUNCTION eed_private.change_password(
    name varchar(1000),
    oldpass varchar(1000),
    newpass varchar(1000)
) RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    UPDATE eed.users
        SET password = md5($3)
      WHERE username = $1
        AND password = md5($2);
    RETURN FOUND;
END;
$$;

COMMIT;
