# SQL Server Toolkit

A small public portfolio project with practical SQL Server examples focused on data validation, auditing, reporting, stored procedures and data-quality checks.

All tables and records in this project are fictional and were created only for demonstration purposes.

## What this project demonstrates

- Relational data modeling
- SQL queries and JOINs
- Data-quality validation
- Auditing and reconciliation
- Views for operational reporting
- Stored procedures for reusable checks
- Safe troubleshooting practices without direct production-data correction

## Business scenario

The sample database represents a fictional company with employees, departments and employment status records.

The validation routines identify situations such as:

- Active employees assigned to inactive departments
- Terminated employees still marked as active
- Employees on vacation with inconsistent status
- Missing department assignments
- Duplicate employee identifiers

The approach reflects a key principle used in enterprise environments: **SQL is used to identify and validate inconsistencies, while business corrections should be performed through the application whenever possible to preserve auditability and business rules.**

## Files

- `schema.sql` — sample database structure
- `sample_data.sql` — fictional test data
- `validation_queries.sql` — data-quality and audit queries
- `views.sql` — reusable reporting views
- `stored_procedures.sql` — stored procedures for validation routines

## Skills demonstrated

`SQL Server` `T-SQL` `Stored Procedures` `Views` `Data Validation` `Data Quality` `Troubleshooting` `ERP` `Business Rules`

---

Created as part of my public technical portfolio.
