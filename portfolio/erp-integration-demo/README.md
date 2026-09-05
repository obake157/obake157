# ERP Integration Demo

A public portfolio project demonstrating a simplified **ERP-to-external-service integration** using Python and REST APIs.

## Scenario

An ERP needs to synchronize employee records with an external workforce platform. The integration must:

- map internal ERP fields to an API payload;
- validate required data before sending;
- authenticate using a bearer token;
- handle timeouts and transient HTTP errors;
- retry safe requests;
- log the synchronization result;
- avoid exposing secrets in source code.

## Skills demonstrated

- REST API integration
- JSON payload mapping
- Authentication
- Error handling
- Retry strategy
- Environment variables
- ERP integration concepts
- Data validation

## Run

```bash
pip install -r requirements.txt
export API_BASE_URL=https://example.invalid
export API_TOKEN=demo-token
python src/sync.py
```

The default URL is intentionally non-functional. This project is designed to demonstrate integration structure without connecting to a real service.

## Important

All data, endpoints and business rules are fictional. This project contains no proprietary source code, credentials or confidential information.
