# Python REST API Demo

My earlier development work was mostly Delphi and SQL. In newer projects I have been using Python more often, so I built this small API to keep a public example of how I structure a backend today.

It is intentionally simple: customers, validation, persistence and a few endpoints. The point is not the size of the project; it is the separation between HTTP handling, validation, database access and configuration.

## Stack

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- Docker

## Endpoints

- `GET /health` — basic health check
- `GET /customers` — list customers
- `POST /customers` — create a customer
- `GET /customers/{id}` — retrieve one customer

## Run locally

```bash
docker compose up --build
```

Then open:

- API: `http://localhost:8000`
- Swagger: `http://localhost:8000/docs`

## Why this structure

Even in a small API, I prefer not to put database code, validation and request handling in the same place. Keeping those responsibilities separated makes it easier to test, change business rules and replace infrastructure later.

Configuration is kept outside the source code so connection strings and secrets do not need to be committed.

This repository uses only fictional data and generic rules. It is not a copy of RY ONE or code from a previous employer.
