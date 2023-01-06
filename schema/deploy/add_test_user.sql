-- Deploy eed:add_test_user to pg

BEGIN;


CREATE USER eed_test_user WITH LOGIN PASSWORD 'secret';

GRANT eed_internal to eed_test_user;


COMMIT;
