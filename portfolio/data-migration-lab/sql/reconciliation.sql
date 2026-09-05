/*
  Reconciliation examples for a fictional ERP migration.
  Adapt table names and filters to the real target environment.
*/

-- 1. Count records by employment status.
SELECT
    status,
    COUNT(*) AS total_employees
FROM target_employees
GROUP BY status
ORDER BY status;

-- 2. Identify duplicate business keys.
SELECT
    email,
    COUNT(*) AS duplicate_count
FROM target_employees
GROUP BY email
HAVING COUNT(*) > 1;

-- 3. Identify employees without a department.
SELECT
    employee_id,
    name,
    email
FROM target_employees
WHERE department IS NULL
   OR LTRIM(RTRIM(department)) = '';

-- 4. High-level reconciliation pattern.
-- Compare source and target totals after applying the same migration scope.
SELECT
    (SELECT COUNT(*) FROM staging_source_employees) AS source_total,
    (SELECT COUNT(*) FROM target_employees) AS target_total;
