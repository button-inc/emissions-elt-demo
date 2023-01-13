-- Deploy eed:add_users to pg

BEGIN;

SELECT eed_private.insert_user('shon@button.is', 'analyst');
SELECT eed_private.insert_user('ballard@button.is', 'analyst');
SELECT eed_private.insert_user('joshua@button.is', 'analyst');
SELECT eed_private.insert_user('shon.hogan@gmail.com', 'manager');
SELECT eed_private.insert_user('ballardrobinett@gmail.com', 'dropper');

COMMIT;
