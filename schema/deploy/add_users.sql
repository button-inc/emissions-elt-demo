-- Deploy eed:add_users to pg

BEGIN;

SELECT eed_private.insert_user('shon@button.is', 'analyst');
SELECT eed_private.insert_user('ballard@button.is', 'analyst');
SELECT eed_private.insert_user('joshua@button.is', 'analyst');
SELECT eed_private.insert_user('shon.hogan@gmail.com', 'manager');
SELECT eed_private.insert_user('ballardrobinett@gmail.com', 'dropper');
SELECT eed_private.insert_user('gabriel@button.is', 'analyst');
SELECT eed_private.insert_user('patrick@button.is', 'analyst');
SELECT eed_private.insert_user('lin.yaokun1@gmail.com', 'manager');
SELECT eed_private.insert_user('mike@button.is', 'analyst');
SELECT eed_private.insert_user('climatetrax.analyst@gmail.com', 'analyst');
SELECT eed_private.insert_user('climatetrax.manager@gmail.com', 'manager');

COMMIT;
