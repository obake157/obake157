import json
from pathlib import Path

import requests

from client import IntegrationClient
from mapper import map_employee_to_payload

BASE_DIR = Path(__file__).resolve().parents[1]
SOURCE_FILE = BASE_DIR / "sample_data" / "employees.json"


def load_employees() -> list[dict]:
    with SOURCE_FILE.open("r", encoding="utf-8") as file:
        return json.load(file)


def main() -> None:
    client = IntegrationClient()

    for employee in load_employees():
        try:
            payload = map_employee_to_payload(employee)
            client.upsert_employee(payload["externalId"], payload)
            print(f"SYNC OK employee_id={employee['employee_id']}")
        except ValueError as exc:
            print(f"VALIDATION ERROR employee_id={employee.get('employee_id')} error={exc}")
        except requests.RequestException as exc:
            print(f"API ERROR employee_id={employee.get('employee_id')} error={exc}")


if __name__ == "__main__":
    main()
