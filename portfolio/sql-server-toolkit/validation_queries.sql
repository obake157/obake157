-- 1. Active employees assigned to inactive departments
SELECT
    e.EmployeeNumber,
    e.FullName,
    d.DepartmentCode,
    d.DepartmentName
FROM Employees e
JOIN Departments d ON d.DepartmentId = e.DepartmentId
WHERE e.IsActive = 1
  AND d.IsActive = 0;

-- 2. Terminated employees still marked as active
SELECT
    EmployeeNumber,
    FullName,
    EmploymentStatus,
    TerminationDate,
    IsActive
FROM Employees
WHERE EmploymentStatus = 'TERMINATED'
  AND IsActive = 1;

-- 3. Employees with inconsistent vacation flags
SELECT
    EmployeeNumber,
    FullName,
    EmploymentStatus,
    IsOnVacation
FROM Employees
WHERE (EmploymentStatus = 'VACATION' AND IsOnVacation = 0)
   OR (EmploymentStatus <> 'VACATION' AND IsOnVacation = 1);

-- 4. Active employees without department assignment
SELECT
    EmployeeNumber,
    FullName
FROM Employees
WHERE IsActive = 1
  AND DepartmentId IS NULL;

-- 5. Monthly validation summary
SELECT
    SUM(CASE WHEN e.IsActive = 1 AND d.IsActive = 0 THEN 1 ELSE 0 END) AS ActiveInInactiveDepartment,
    SUM(CASE WHEN e.EmploymentStatus = 'TERMINATED' AND e.IsActive = 1 THEN 1 ELSE 0 END) AS TerminatedStillActive,
    SUM(CASE WHEN (e.EmploymentStatus = 'VACATION' AND e.IsOnVacation = 0)
              OR (e.EmploymentStatus <> 'VACATION' AND e.IsOnVacation = 1)
             THEN 1 ELSE 0 END) AS VacationStatusMismatch,
    SUM(CASE WHEN e.IsActive = 1 AND e.DepartmentId IS NULL THEN 1 ELSE 0 END) AS MissingDepartment
FROM Employees e
LEFT JOIN Departments d ON d.DepartmentId = e.DepartmentId;
