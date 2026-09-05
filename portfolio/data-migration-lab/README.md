# Data Migration Lab

I have worked on ERP migrations where the difficult part was not exporting a table and importing it somewhere else. The difficult part was proving that the target data was complete, consistent and still respected the business rules from the source system.

This project is a simplified version of that kind of work using fictional HR/ERP data.

## Scenario

A legacy system exports employee records that need to be prepared for a new ERP. Before anything is considered ready for import, the process has to:

- normalize department and employment-status values;
- reject rows with missing required information;
- detect duplicate identifiers;
- separate invalid records with a clear reason;
- generate a clean target file;
- compare source and target totals.

## Run

```bash
pip install -r requirements.txt
python src/migrate.py
```

Generated files:

- `output/clean_employees.csv`
- `output/rejected_employees.csv`

## Why I included rejected records

In a real migration, silently dropping a bad row is usually worse than stopping the process. I prefer to keep rejected records visible with the reason they failed, so they can be reviewed, corrected and processed again.

The same applies to reconciliation: a migration is not finished just because the import command succeeded. Counts, totals and key records still need to be compared between source and destination.

## Technologies and concepts

Python · SQL · ETL · Data Validation · Reconciliation · Business Rules

All names, IDs and rules in this repository are synthetic. No production data or proprietary migration scripts are included.
