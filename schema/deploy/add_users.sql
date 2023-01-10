-- Deploy eed:add_users to pg

BEGIN;

SELECT eed_private.insert_user('shon', 'shon@button.is', 'analyst');
SELECT eed_private.insert_user('ballard', 'ballard@button.is', 'analyst');
SELECT eed_private.insert_user('josh', 'joshua@button.is', 'analyst');

COMMIT;
