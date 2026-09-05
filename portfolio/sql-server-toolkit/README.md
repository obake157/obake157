# SQL Server Toolkit

This project is a small collection of SQL Server examples based on a type of problem I dealt with repeatedly in ERP environments: **finding inconsistent data before it turns into an operational problem**.

In previous work, SQL was often my first tool for checking whether records made sense before payroll, reporting or other critical routines. The goal was not to edit production tables directly. The goal was to identify the problem, understand the rule that was being broken and then correct the record through the application when possible.

Everything in this repository is fictional. The schema and sample data were created only to reproduce that workflow safely.

## Scenario

The sample database contains employees, departments and employment-status information. The validation scripts look for cases such as:

- active employees linked to inactive departments;
- terminated employees still marked as active;
- vacation records with inconsistent status;
- employees without a valid department;
- duplicated employee identifiers.

## Files

- `schema.sql` — sample tables and relationships
- `sample_data.sql` — intentionally mixed valid and invalid records
- `validation_queries.sql` — checks used to locate data inconsistencies
- `views.sql` — reusable views for operational analysis
- `stored_procedures.sql` — examples of reusable validation routines

## What matters to me in this example

A query that returns rows is not enough. For each validation, I try to make the result useful to someone who has to investigate the problem: identify the record, show the conflicting information and make the business rule understandable.

That is also why this example separates **diagnosis** from **correction**. In a real ERP, bypassing the application to fix data directly in the database can skip validations, audit trails and other rules.

## Technologies

SQL Server · T-SQL · Stored Procedures · Views · Data Validation · Data Quality

---

Synthetic portfolio example. No employer or client code is included.
