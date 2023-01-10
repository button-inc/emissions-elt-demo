-- Verify eed:add_users on pg

BEGIN;

SELECT 1 FROM eed.users WHERE email = 'shon@button.is';
SELECT 1 FROM eed.users WHERE email = 'ballard@button.is';
SELECT 1 FROM eed.users WHERE email = 'joshua@button.is';

ROLLBACK;
