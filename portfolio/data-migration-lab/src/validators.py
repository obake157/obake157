from collections import Counter

VALID_STATUSES = {"ACTIVE", "ON_LEAVE", "TERMINATED"}

DEPARTMENT_MAP = {
    "finance": "FINANCE",
    "human resources": "HR",
    "hr": "HR",
    "it": "IT",
    "operations": "OPERATIONS",
}


def normalize_department(value: str) -> str:
    return DEPARTMENT_MAP.get(value.strip().lower(), value.strip().upper())


def validate_rows(rows: list[dict]) -> tuple[list[dict], list[dict]]:
    emails = [row["email"].strip().lower() for row in rows if row["email"].strip()]
    duplicate_emails = {email for email, count in Counter(emails).items() if count > 1}

    clean_rows: list[dict] = []
    rejected_rows: list[dict] = []

    for row in rows:
        current = dict(row)
        current["email"] = current["email"].strip().lower()
        current["department"] = normalize_department(current["department"])
        current["status"] = current["status"].strip().upper()

        errors: list[str] = []

        if not current["employee_id"].strip():
            errors.append("missing employee_id")
        if not current["name"].strip():
            errors.append("missing name")
        if not current["email"]:
            errors.append("missing email")
        elif current["email"] in duplicate_emails:
            errors.append("duplicate email")
        if current["status"] not in VALID_STATUSES:
            errors.append("invalid status")

        if errors:
            current["rejection_reason"] = "; ".join(errors)
            rejected_rows.append(current)
        else:
            clean_rows.append(current)

    return clean_rows, rejected_rows
