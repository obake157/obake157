def map_employee_to_payload(employee: dict) -> dict:
    required_fields = ["employee_id", "name", "email", "department", "active"]
    missing = [field for field in required_fields if field not in employee]

    if missing:
        raise ValueError(f"Missing required fields: {', '.join(missing)}")

    return {
        "externalId": str(employee["employee_id"]),
        "fullName": employee["name"].strip(),
        "email": employee["email"].strip().lower(),
        "department": employee["department"].strip().upper(),
        "status": "ACTIVE" if employee["active"] else "INACTIVE",
    }
