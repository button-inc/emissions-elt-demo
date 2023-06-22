-- This file is for testing the SonarCloud scan. Do not merge. --

-- Inserts should include values for non-null columns
INSERT INTO MY_TABLE  -- Noncompliant; N2 value omitted
  (
    N1
  )
  VALUES
  (
    1
  )

-- "DELETE" and "UPDATE" statements should contain "WHERE" clauses
DECLARE
  maxAge PLS_INTEGER := 60;
BEGIN
  UPDATE employee SET status = 'retired'; -- Noncompliant - the WHERE was forgotten
END;
/
