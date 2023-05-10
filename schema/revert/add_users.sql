-- Revert eed:add_users from pg

BEGIN;

DELETE FROM eed.permissions WHERE email = 'shon@button.is';
DELETE FROM eed.permissions WHERE email = 'ballard@button.is';
DELETE FROM eed.permissions WHERE email = 'joshua@button.is';
DELETE FROM eed.permissions WHERE email = 'shon.hogan@gmail.com';
DELETE FROM eed.permissions WHERE email = 'ballardrobinett@gmail.com';
DELETE FROM eed.permissions WHERE email = 'gabriel@button.is.com';
DELETE FROM eed.permissions WHERE email = 'patrick@button.is';
DELETE FROM eed.permissions WHERE email = 'lin.yaokun1@gmail.com';
DELETE FROM eed.permissions WHERE email = 'mike@button.is';
DELETE FROM eed.permissions WHERE email = 'climatetrax.analyst@gmail.com';
DELETE FROM eed.permissions WHERE email = 'climatetrax.manager@gmail.com';

COMMIT;
