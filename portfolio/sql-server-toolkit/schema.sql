CREATE TABLE Departments (
    DepartmentId INT PRIMARY KEY,
    DepartmentCode VARCHAR(20) NOT NULL UNIQUE,
    DepartmentName VARCHAR(120) NOT NULL,
    IsActive BIT NOT NULL DEFAULT 1
);

CREATE TABLE Employees (
    EmployeeId INT PRIMARY KEY,
    EmployeeNumber VARCHAR(20) NOT NULL UNIQUE,
    FullName VARCHAR(150) NOT NULL,
    DepartmentId INT NULL,
    EmploymentStatus VARCHAR(20) NOT NULL,
    HireDate DATE NOT NULL,
    TerminationDate DATE NULL,
    IsOnVacation BIT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    CONSTRAINT FK_Employees_Departments
        FOREIGN KEY (DepartmentId) REFERENCES Departments(DepartmentId)
);

CREATE INDEX IX_Employees_DepartmentId ON Employees(DepartmentId);
CREATE INDEX IX_Employees_Status ON Employees(EmploymentStatus, IsActive);
