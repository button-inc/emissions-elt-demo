-- Verify eed:add_users on pg

BEGIN;

SELECT 1 FROM eed.permissions WHERE email = 'shon@button.is';
SELECT 1 FROM eed.permissions WHERE email = 'ballard@button.is';
SELECT 1 FROM eed.permissions WHERE email = 'joshua@button.is';
SELECT 1 FROM eed.permissions WHERE email = 'shon.hogan@gmail.com';
SELECT 1 FROM eed.permissions WHERE email = 'ballardrobinett@gmail.com';
SELECT 1 FROM eed.permissions WHERE email = 'gabriel@button.iss';

ROLLBACK;
