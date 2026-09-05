# Data Migration Lab

A portfolio project inspired by real-world ERP migration work, using **fictional data** to demonstrate extraction, transformation, validation and reconciliation techniques.

## Scenario

A legacy HR/ERP export must be prepared for a new system. The migration process needs to:

- normalize department and employment-status values;
- validate required fields;
- identify duplicate records;
- separate rejected rows with clear reasons;
- generate a clean target file;
- support reconciliation between source and target totals.

## Skills demonstrated

- Python data processing
- ETL / data migration
- Data validation
- Business rules
- Reconciliation
- Error reporting
- SQL validation concepts

## Run

```bash
pip install -r requirements.txt
python src/migrate.py
```

Generated files:

- `output/clean_employees.csv`
- `output/rejected_employees.csv`

## Important

All names, companies, IDs and business rules in this project are fictional. No confidential data or proprietary migration scripts are included.
