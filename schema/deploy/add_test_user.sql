-- Deploy eed:add_test_user to pg

BEGIN;


CREATE USER eed_test_user WITH LOGIN PASSWORD 'secret';

--GRANT eed_internal to eed_test_user;
SELECT eed_private.insert_user('eed_test_user', 'secret', 'eed_test_user@button.is');


COMMIT;
