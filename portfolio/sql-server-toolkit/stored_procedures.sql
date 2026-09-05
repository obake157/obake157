CREATE OR ALTER PROCEDURE usp_ValidateEmployeeData
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        e.EmployeeNumber,
        e.FullName,
        d.DepartmentCode,
        d.DepartmentName,
        'ACTIVE_IN_INACTIVE_DEPARTMENT' AS Issue
    FROM Employees e
    JOIN Departments d ON d.DepartmentId = e.DepartmentId
    WHERE e.IsActive = 1
      AND d.IsActive = 0;

    SELECT
        EmployeeNumber,
        FullName,
        TerminationDate,
        'TERMINATED_STILL_ACTIVE' AS Issue
    FROM Employees
    WHERE EmploymentStatus = 'TERMINATED'
      AND IsActive = 1;

    SELECT
        EmployeeNumber,
        FullName,
        EmploymentStatus,
        IsOnVacation,
        'VACATION_STATUS_MISMATCH' AS Issue
    FROM Employees
    WHERE (EmploymentStatus = 'VACATION' AND IsOnVacation = 0)
       OR (EmploymentStatus <> 'VACATION' AND IsOnVacation = 1);

    SELECT
        EmployeeNumber,
        FullName,
        'MISSING_DEPARTMENT' AS Issue
    FROM Employees
    WHERE IsActive = 1
      AND DepartmentId IS NULL;
END;
GO

-- Example execution
EXEC usp_ValidateEmployeeData;
