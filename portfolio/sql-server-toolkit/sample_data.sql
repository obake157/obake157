INSERT INTO Departments (DepartmentId, DepartmentCode, DepartmentName, IsActive) VALUES
(1, 'ADM', 'Administration', 1),
(2, 'FIN', 'Finance', 1),
(3, 'OPS', 'Operations', 1),
(4, 'OLD', 'Legacy Department', 0);

INSERT INTO Employees (EmployeeId, EmployeeNumber, FullName, DepartmentId, EmploymentStatus, HireDate, TerminationDate, IsOnVacation, IsActive) VALUES
(1, 'E1001', 'Ana Souza', 1, 'ACTIVE', '2021-03-10', NULL, 0, 1),
(2, 'E1002', 'Bruno Lima', 4, 'ACTIVE', '2020-08-15', NULL, 0, 1),
(3, 'E1003', 'Carla Mendes', 2, 'TERMINATED', '2019-05-01', '2025-12-20', 0, 1),
(4, 'E1004', 'Daniel Rocha', 3, 'ACTIVE', '2022-01-12', NULL, 1, 1),
(5, 'E1005', 'Elisa Martins', NULL, 'ACTIVE', '2023-07-03', NULL, 0, 1),
(6, 'E1006', 'Felipe Costa', 2, 'VACATION', '2021-11-18', NULL, 0, 1),
(7, 'E1007', 'Gabriela Alves', 3, 'ACTIVE', '2024-02-14', NULL, 0, 1);
