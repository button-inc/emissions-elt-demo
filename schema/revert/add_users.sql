-- Revert eed:add_users from pg

BEGIN;

DELETE FROM eed.permissions WHERE email = 'shon@button.is';
DELETE FROM eed.permissions WHERE email = 'ballard@button.is';
DELETE FROM eed.permissions WHERE email = 'joshua@button.is';
DELETE FROM eed.permissions WHERE email = 'shon.hogan@gmail.com';
DELETE FROM eed.permissions WHERE email = 'ballardrobinett@gmail.com';

COMMIT;
