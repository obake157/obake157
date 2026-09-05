# ERP Integration Demo

A REST integration is rarely difficult because of the HTTP request itself. In ERP work, most of the effort is usually in field mapping, required data, authentication, retries, logs and understanding what should happen when one side accepts a record and the other side does not.

This project is a small public example of that workflow using fictional employee data and a fake external service.

## Scenario

An ERP needs to synchronize employee records with an external workforce platform. Before sending anything, the integration has to:

- map internal ERP fields to the external payload;
- validate required values;
- authenticate with a bearer token;
- handle timeouts and temporary HTTP failures;
- retry only when it is safe to do so;
- record the result of each synchronization attempt;
- keep secrets outside the source code.

## Run

```bash
pip install -r requirements.txt
export API_BASE_URL=https://example.invalid
export API_TOKEN=demo-token
python src/sync.py
```

The default URL is intentionally invalid. The code is meant to show the integration structure without calling a real service.

## Design choices

I keep mapping and validation explicit because integrations become difficult to maintain when business rules are hidden inside request code. I also prefer errors to preserve enough context to answer basic support questions: which record failed, what was sent, what the remote service returned and whether a retry makes sense.

Secrets are read from environment variables rather than committed to the repository.

## Technologies and concepts

Python · REST APIs · JSON · Authentication · Retry Handling · Data Validation · ERP Integration

All endpoints, records and rules are fictional. No credentials, customer data or proprietary integration code are included.
