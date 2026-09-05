CREATE VIEW vw_EmployeeValidationStatus AS
SELECT
    e.EmployeeId,
    e.EmployeeNumber,
    e.FullName,
    e.EmploymentStatus,
    e.IsOnVacation,
    e.IsActive,
    d.DepartmentCode,
    d.DepartmentName,
    CASE
        WHEN e.IsActive = 1 AND d.IsActive = 0 THEN 'ACTIVE_IN_INACTIVE_DEPARTMENT'
        WHEN e.EmploymentStatus = 'TERMINATED' AND e.IsActive = 1 THEN 'TERMINATED_STILL_ACTIVE'
        WHEN e.EmploymentStatus = 'VACATION' AND e.IsOnVacation = 0 THEN 'VACATION_FLAG_MISMATCH'
        WHEN e.EmploymentStatus <> 'VACATION' AND e.IsOnVacation = 1 THEN 'VACATION_FLAG_MISMATCH'
        WHEN e.IsActive = 1 AND e.DepartmentId IS NULL THEN 'MISSING_DEPARTMENT'
        ELSE 'OK'
    END AS ValidationStatus
FROM Employees e
LEFT JOIN Departments d ON d.DepartmentId = e.DepartmentId;
