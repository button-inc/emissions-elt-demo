-- Revert eed:add_users from pg

BEGIN;

DELETE FROM eed.users WHERE email = 'shon@button.is';
DELETE FROM eed.users WHERE email = 'ballard@button.is';
DELETE FROM eed.users WHERE email = 'joshua@button.is';

COMMIT;
