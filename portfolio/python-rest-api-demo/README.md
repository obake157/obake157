# Python REST API Demo

A compact backend portfolio project demonstrating a REST API built with **Python, FastAPI, SQLAlchemy and PostgreSQL**.

## What this project demonstrates

- REST API design
- CRUD operations
- PostgreSQL integration
- SQLAlchemy ORM
- Pydantic validation
- Environment-based configuration
- Docker setup
- Basic automated testing
- Clean separation between API, models, schemas and database configuration

## Main endpoints

- `GET /health` — service health check
- `GET /customers` — list customers
- `POST /customers` — create a customer
- `GET /customers/{id}` — retrieve a customer

## Run with Docker

```bash
docker compose up --build
```

Then open:

- API: `http://localhost:8000`
- Swagger docs: `http://localhost:8000/docs`

## Environment

Copy `.env.example` to `.env` if you want to customize the database connection.

## Portfolio note

This is a demonstration project using fictional data and generic business rules. It does not contain commercial source code or confidential information from previous employers or from RY ONE.
